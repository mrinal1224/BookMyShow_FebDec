@@ .. @@
 import { useEffect, useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { hideLoading, showLoading } from "../redux/loaderSlice";
 import { getShowById } from "../calls/shows";
 import { useNavigate, useParams } from "react-router-dom";
 import { message, Card, Row, Col, Button } from "antd";
-import moment from "moment";
 import { bookShow, makePayment } from "../calls/bookings";
 import StripeCheckout from "react-stripe-checkout";
+import SeatLayout from "../components/seats/SeatLayout";
+import { formatDate, formatTime, formatCurrency, calculateTotalPrice } from "../utils/helpers";
+import { PAYMENT_CONFIG } from "../utils/constants";

 const BookShow = () => {
@@ .. @@
     }
   };

-  const getSeats = () => {
-    let columns = 12;
-    let totalSeats = show.totalSeats;
-    let rows = Math.ceil(totalSeats / columns);
-
-    return (
-      <div className="d-flex flex-column align-items-center">
-        <div className="w-100 max-width-600 mx-auto mb-25px">
-          <p className="text-center mb-10px">
-            Screen this side, you will be watching in this direction
-          </p>
-          <div className="screen-div"></div>
-        </div>
-        <ul className="seat-ul justify-content-center">
-          {Array.from(Array(rows).keys()).map((row) => {
-            return Array.from(Array(columns).keys()).map((column) => {
-              let seatNumber = row * columns + column + 1;
-
-              // Calculation for the first iteration
-              // 0*12 + 0+1 = 1
-              // 0*12 + 1+1 = 2
-              // 0*12 + 2+1 = 3
-              // So on up till 12th seat
-
-              // Calculation for the second iteration
-              // 1*12 + 0+1 = 13
-              // 1*12 + 1+1 = 14
-              // 1*12 + 2+1 = 15
-              // So on up till 24th seat
-
-              // Calculation for the third iteration
-              // 2*12 + 0+1 = 25
-              // 2*12 + 1+1 = 26
-              // 2*12 + 2+1 = 27
-              // So on up till 36th seat
-
-              // So on...
-
-              // this part
-
-              let seatClass = "seat-btn";
-
-              if (selectedSeats.includes(seatNumber)) {
-                seatClass += " selected";
-              }
-              if (show.bookedSeats.includes(seatNumber)) {
-                seatClass += " booked";
-              }
-
-              if (seatNumber <= totalSeats)
-                return (
-                  <li>
-                    <button
-                      onClick={() => {
-                        if (selectedSeats.includes(seatNumber)) {
-                          setSelectedSeats(
-                            selectedSeats.filter(
-                              (curSeatNumber) => curSeatNumber !== seatNumber
-                            )
-                          );
-                        } else {
-                          setSelectedSeats([...selectedSeats, seatNumber]);
-                        }
-                      }}
-                      className={seatClass}
-                    >
-                      {seatNumber}
-                    </button>
-                  </li>
-                );
-            });
-          })}
-        </ul>
-
-        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
-          <div className="flex-1">
-            Selected Seats: <span>{selectedSeats.join(", ")}</span>
-          </div>
-          <div className="flex-shrink-0 ms-3">
-            Total Price:{" "}
-            <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
-          </div>
-        </div>
-      </div>
-    );
+  const handleSeatSelect = (seatNumber) => {
+    if (selectedSeats.includes(seatNumber)) {
+      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
+    } else {
+      setSelectedSeats([...selectedSeats, seatNumber]);
+    }
   };

   const book = async (transactionId) => {
@@ .. @@
     try {
       dispatch(showLoading());
       const response = await makePayment(
         token,
-        selectedSeats.length * show.ticketPrice * 100
+        calculateTotalPrice(selectedSeats, show.ticketPrice) * 100
       );
       if (response.success) {
         message.success(response.message);
         book(response.data);
-         console.log(response);
       } else {
         message.error(response.message);
       }
@@ .. @@
     }
   };

-
-
-
   useEffect(() => {
     getData();
   }, []);

   return (
     <>
       {show && (
         <Row gutter={24}>
           <Col span={24}>
             <Card
               title={
                 <div className="movie-title-details">
                   <h1>{show.movie.title}</h1>
                   <p>
                     Theatre: {show.theatre.name}, {show.theatre.address}
                   </p>
                 </div>
               }
               extra={
                 <div className="show-name py-3">
                   <h3>
                     <span>Show Name:</span> {show.name}
                   </h3>
                   <h3>
                     <span>Date & Time: </span>
-                    {moment(show.date).format("MMM Do YYYY")} at{" "}
-                    {moment(show.time, "HH:mm").format("hh:mm A")}
+                    {formatDate(show.date)} at {formatTime(show.time)}
                   </h3>
                   <h3>
-                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
+                    <span>Ticket Price:</span> {formatCurrency(show.ticketPrice)}
                   </h3>
                   <h3>
                     <span>Total Seats:</span> {show.totalSeats}
                     <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                     {show.totalSeats - show.bookedSeats.length}{" "}
                   </h3>
                 </div>
               }
               style={{ width: "100%" }}
             >
-              {getSeats()}
+              <SeatLayout
+                totalSeats={show.totalSeats}
+                bookedSeats={show.bookedSeats}
+                selectedSeats={selectedSeats}
+                onSeatSelect={handleSeatSelect}
+              />
+
+              {/* Selected Seats Summary */}
+              {selectedSeats.length > 0 && (
+                <div className="bottom-card d-flex justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
+                  <div className="flex-1">
+                    Selected Seats: <span>{selectedSeats.join(", ")}</span>
+                  </div>
+                  <div className="flex-shrink-0 ms-3">
+                    Total Price: <span>{formatCurrency(calculateTotalPrice(selectedSeats, show.ticketPrice))}</span>
+                  </div>
+                </div>
+              )}

               {selectedSeats.length > 0 && (
                 <StripeCheckout
                   token={onToken}
-                  amount={selectedSeats.length * show.ticketPrice*100}
-            
-        
-                  stripeKey="pk_test_51JKPQWSJULHQ0FL7VOkMrOMFh0AHMoCFit29EgNlVRSvFkDxSoIuY771mqGczvd6bdTHU1EkhJpojOflzoIFGmj300Uj4ALqXa"
+                  amount={calculateTotalPrice(selectedSeats, show.ticketPrice) * 100}
+                  currency={PAYMENT_CONFIG.CURRENCY}
+                  stripeKey={PAYMENT_CONFIG.STRIPE_PUBLIC_KEY}
                 >
-                  {/* Use this one in some situation=> pk_test_eTH82XLklCU1LJBkr2cSDiGL001Bew71X8  */}
                   <div className="max-width-600 mx-auto">
                     <Button type="primary" shape="round" size="large" block>
-                      Pay Now
+                      Pay {formatCurrency(calculateTotalPrice(selectedSeats, show.ticketPrice))}
                     </Button>
                   </div>
                 </StripeCheckout>
@@ .. @@
     </>
   );
 };
+
 export default BookShow;