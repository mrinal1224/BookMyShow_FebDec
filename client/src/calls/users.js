@@ .. @@
-const {axiosInstance} = require('./index')
+import { axiosInstance } from './index';
+import { API_ENDPOINTS } from '../utils/constants';

-//Register new User
-
+// Register new User
 export const RegisterUser = async (value) => {
-    try{
-        const response = await axiosInstance.post("api/users/register", value);
+    try {
+        const response = await axiosInstance.post(API_ENDPOINTS.USERS.REGISTER, value);
         return response.data;
-    }catch(error){
-        console.log(error);
+    } catch (error) {
+        return {
+            success: false,
+            message: error.response?.data?.message || error.message
+        };
     }
-}
-
+};

-// login user
-
-export const LoginUser = async (value) =>{
+// Login user
+export const LoginUser = async (value) => {
     try {
-        const response = await axiosInstance.post("api/users/login", value);
-        return response.data
+        const response = await axiosInstance.post(API_ENDPOINTS.USERS.LOGIN, value);
+        return response.data;
     } catch (error) {
-        console.log(error);
+        return {
+            success: false,
+            message: error.response?.data?.message || error.message
+        };
     }
-}
+};

-// get current user from the frontend
-
-export const GetCurrentUser = async () =>{
-       try {
-           const response = await axiosInstance.get('api/users/get-current-user')
-           return response.data
-       } catch (error) {
-          console.log(error)
-       }
-}
-
-
-
-
-
-
-
-
-
-
-
-
-
+// Get current user from the frontend
+export const GetCurrentUser = async () => {
+    try {
+        const response = await axiosInstance.get(API_ENDPOINTS.USERS.GET_CURRENT);
+        return response.data;
+    } catch (error) {
+        return {
+            success: false,
+            message: error.response?.data?.message || error.message
+        };
+    }
+};