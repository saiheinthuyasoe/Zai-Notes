## Payment Free Hosting (Recommendation)

If you want to add **premium features**, **manga subscriptions**, or **one-time purchases**, you’ll need a **free-tier payment provider**. Here are the best options:

---

### **1️⃣ Free Payment Providers for Your Manga Platform**  

| **Provider**  | **Free Tier** | **Best For** | **Transaction Fees** |
|--------------|--------------|-------------|---------------------|
| **Stripe** 💳 | ✅ No monthly fees | One-time payments, subscriptions | 2.9% + $0.30 per transaction |
| **PayPal** 🏦 | ✅ No monthly fees | PayPal payments, digital goods | 2.9% + $0.30 per transaction |
| **Razorpay** 🏆 | ✅ Free (India) | Indian payments, UPI | 2% per transaction |
| **Paddle** 🚀 | ✅ No monthly fees | Handling VAT/GST automatically | 5% + $0.50 per transaction |
| **Coinbase Commerce** ₿ | ✅ Free setup | Crypto payments (Bitcoin, Ethereum) | 1% per transaction |

---

### **2️⃣ Best Free Payment Setup for Your Manga Reader**  

#### **(A) Stripe (Best for Credit Cards & Subscriptions)**
✅ **Pros:**  
✔ **No monthly cost**  
✔ **Supports one-time payments & subscriptions**  
✔ **Easy integration with Next.js & Spring Boot**  

✅ **Setup (Next.js Frontend)**  
1. Install Stripe in your Next.js app:  
   ```sh
   npm install @stripe/react-stripe-js @stripe/stripe-js
   ```
2. Add Stripe to your payment page:  
   ```js
   import { loadStripe } from "@stripe/stripe-js";
   import { Elements } from "@stripe/react-stripe-js";

   const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

   function PaymentPage() {
       return (
           <Elements stripe={stripePromise}>
               <CheckoutForm />
           </Elements>
       );
   }

   export default PaymentPage;
   ```

✅ **Setup (Spring Boot Backend)**  
1. Add Stripe dependency in Spring Boot:  
   ```xml
   <dependency>
       <groupId>com.stripe</groupId>
       <artifactId>stripe-java</artifactId>
       <version>20.0.0</version>
   </dependency>
   ```
2. Create a Stripe **payment API** in Spring Boot:  
   ```java
   @RestController
   @RequestMapping("/payment")
   public class PaymentController {

       @PostMapping("/create-checkout-session")
       public ResponseEntity<?> createCheckoutSession() throws StripeException {
           Stripe.apiKey = "YOUR_SECRET_KEY";

           SessionCreateParams params = SessionCreateParams.builder()
               .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
               .setMode(SessionCreateParams.Mode.PAYMENT)
               .setSuccessUrl("https://your-site.com/success")
               .setCancelUrl("https://your-site.com/cancel")
               .addLineItem(
                   SessionCreateParams.LineItem.builder()
                       .setQuantity(1L)
                       .setPriceData(
                           SessionCreateParams.LineItem.PriceData.builder()
                               .setCurrency("usd")
                               .setUnitAmount(500) // $5.00
                               .setProductData(
                                   SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                       .setName("Manga Subscription")
                                       .build()
                               )
                               .build()
                       )
                       .build()
               )
               .build();

           Session session = Session.create(params);
           return ResponseEntity.ok(session.getId());
       }
   }
   ```

✅ **Next.js Checkout Flow**
- Call the `/payment/create-checkout-session` API  
- Redirect user to Stripe’s hosted checkout page  

---

#### **(B) PayPal (If Users Prefer PayPal Over Cards)**  
✅ **Pros:**  
✔ Free setup  
✔ PayPal wallet payments  
✔ International support  

✅ **Setup (Next.js Frontend)**  
1. Install PayPal SDK:  
   ```sh
   npm install @paypal/react-paypal-js
   ```
2. Add PayPal checkout button:  
   ```js
   import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

   function PayPalPayment() {
       return (
           <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
               <PayPalButtons
                   createOrder={(data, actions) => {
                       return actions.order.create({
                           purchase_units: [{ amount: { value: "5.00" } }]
                       });
                   }}
                   onApprove={(data, actions) => {
                       return actions.order.capture().then((details) => {
                           alert("Transaction completed by " + details.payer.name.given_name);
                       });
                   }}
               />
           </PayPalScriptProvider>
       );
   }

   export default PayPalPayment;
   ```

✅ **Spring Boot Backend (Webhook for PayPal Payments)**  
1. Enable **webhooks** in **PayPal Developer Console**  
2. Handle webhook event:  
   ```java
   @PostMapping("/paypal-webhook")
   public ResponseEntity<String> handlePayPalWebhook(@RequestBody Map<String, Object> payload) {
       System.out.println("Received PayPal Webhook: " + payload);
       return ResponseEntity.ok("Webhook received");
   }
   ```

---

### **3️⃣ Best Free Payment Strategy for Your Manga Reader**
🔹 **Stripe** → Best for **subscriptions & credit cards**  
🔹 **PayPal** → Best for **PayPal users & one-time payments**  
🔹 **Coinbase Commerce** → If you want **crypto payments**  

