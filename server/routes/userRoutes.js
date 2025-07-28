@@ .. @@
 const express = require("express");
 const User = require("../models/userModel");
 const bcrypt = require("bcrypt");
 const jwt = require("jsonwebtoken");
 const authMiddleware = require("../middlewares/authMiddleware");
+const { validateUserRegistration, validateUserLogin } = require("../middlewares/validation");
+const { successResponse, errorResponse, serverErrorResponse } = require("../utils/responseHelper");

 const router = express.Router();

-router.post("/register", async (req, res) => {
+router.post("/register", validateUserRegistration, async (req, res) => {
   try {
     const userExists = await User.findOne({ email: req.body.email });
     if (userExists) {
-      res.send({
-        success: false,
-        message: "The user already exists!",
-      });
+      return errorResponse(res, "User already exists with this email", 409);
     }
+
     const salt = await bcrypt.genSalt(10);
-    console.log(salt);
     const hashPwd = bcrypt.hashSync(req.body.password, salt);
-    console.log(hashPwd);
     req.body.password = hashPwd;
-    

     const newUser = await User(req.body);
     await newUser.save();
-    // console.log(newUser);
-    res.send({
-      success: true,
-      message: "You've successfully signed up, please login now!",
-    });
-  } catch (err) {
-    console.log(err);
+
+    successResponse(res, "Registration successful! Please login now.", null, 201);
+  } catch (error) {
+    serverErrorResponse(res, error);
   }
 });

-router.post("/login", async (req, res) => {
+router.post("/login", validateUserLogin, async (req, res) => {
   try {
     const user = await User.findOne({ email: req.body.email });

     if (!user) {
-      res.send({
-        success: false,
-        message: "user does not exist Please Register",
-      });
+      return errorResponse(res, "User does not exist. Please register first.", 404);
     }

     const validPassword = await bcrypt.compare(
       req.body.password,
       user.password
     );

     if (!validPassword) {
-      res.send({
-        success: false,
-        message: "Sorry, invalid password entered!",
-      });
+      return errorResponse(res, "Invalid password", 401);
     }

     const token = jwt.sign({ userId: user._id }, process.env.secret_key_jwt, {
       expiresIn: "1d",
     });

-    res.send({
-      success: true,
-      message: "You've successfully logged in!",
-      token: token,
-    });
+    successResponse(res, "Login successful!", { token });
   } catch (error) {
-    console.error(error);
+    serverErrorResponse(res, error);
   }
 });

-// router-level-middleware
-
 router.get("/get-current-user", authMiddleware, async (req, res) => {
-  const user = await User.findById(req.body.userId).select("-password");
+  try {
+    const user = await User.findById(req.body.userId).select("-password");
+    
+    if (!user) {
+      return errorResponse(res, "User not found", 404);
+    }

-  res.send({
-    success: true,
-    message: 'You are authorized to go to the protected route!',
-    data: user
-   })
+    successResponse(res, "User data retrieved successfully", user);
+  } catch (error) {
+    serverErrorResponse(res, error);
+  }
 });

 module.exports = router;