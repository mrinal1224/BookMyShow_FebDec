@@ .. @@
 import axios from 'axios'


 export const axiosInstance = axios.create({
+    baseURL: process.env.REACT_APP_API_URL || '',
     headers : {
-
         'Content-Type' : 'application/json',
-        'authorization' : `Bearer ${localStorage.getItem('token')}`
     }
-})
+});
+
+// Request interceptor to add auth token
+axiosInstance.interceptors.request.use(
+    (config) => {
+        const token = localStorage.getItem('token');
+        if (token) {
+            config.headers.authorization = `Bearer ${token}`;
+        }
+        return config;
+    },
+    (error) => {
+        return Promise.reject(error);
+    }
+);
+
+// Response interceptor to handle common errors
+axiosInstance.interceptors.response.use(
+    (response) => {
+        return response;
+    },
+    (error) => {
+        if (error.response?.status === 401) {
+            localStorage.removeItem('token');
+            window.location.href = '/login';
+        }
+        return Promise.reject(error);
+    }
+);