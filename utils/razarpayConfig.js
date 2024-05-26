const Razorpay = require('razorpay');
const razorpayInstance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
});

const createOrder = async (req, res) => {
    const options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 1 // auto capture
    };
    try {
        const response = await razorpayInstance.orders.create(options);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        });
    } catch (error) {
        res.status(500).send(error);
    }
};
