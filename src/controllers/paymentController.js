const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZARPAY_KEY_ID, // replace with your Razorpay Key ID
    key_secret: process.env.RAZARPAY_KEY_SECERT // replace with your Razorpay Key Secret
});

exports.createOrder = async (req, res) => {
    const { amount, currency, receipt } = req.body;

    try {
        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: currency,
            receipt: receipt,
            payment_capture: 1 // auto capture
        };

        const order = await razorpayInstance.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZARPAY_KEY_SECERT);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
        res.status(200).send('Payment verified');
    } else {
        res.status(400).send('Payment verification failed');
    }
};
