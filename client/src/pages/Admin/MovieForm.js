@@ .. @@
 import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
 import TextArea from "antd/es/input/TextArea";
 import { showLoading, hideLoading } from "../../redux/loaderSlice";
 import { useDispatch } from "react-redux";
 import { addMovie, updateMovie } from "../../calls/movies";
 import moment from "moment";
+import { MOVIE_GENRES, LANGUAGES } from "../../utils/constants";
+import { getValidationRules } from "../../utils/validation";

-// import moment from 'moment';

 const MovieForm = ({
@@ .. @@
 }) => {
   const dispatch = useDispatch();

-  const handleChange = (value) => {
-    console.log(`selected ${value}`);
-  };
-
   if (selectedMovie) {
     selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
       "YYYY-MM-DD"
     );
   }

-  console.log("this is from Form", selectedMovie);
-
   const onFinish = async (values) => {
     try {
       dispatch(showLoading());
       let response = null;
       if (formType === "add") {
         response = await addMovie(values);
-        setSelectedMovie(null);
       } else {
         response = await updateMovie({ ...values, movieId: selectedMovie._id });
-        setSelectedMovie(null);
       }
-      console.log(response);
+      
       if (response.success) {
         getData();
         message.success(response.message);
         setIsModalOpen(false);
+        setSelectedMovie(null);
       } else {
         message.error(response.message);
       }
@@ .. @@
     }
   };

-  // const handleOk = () => {
-  //   setIsModalOpen(false); onOk={handleOk}
-  // }
-
   const handleCancel = () => {
     setIsModalOpen(false);
     setSelectedMovie(null);
   };

-  // console.log(selectedMovie);
-
   return (
     <Modal
       centered
       title={formType === "add" ? "Add Movie" : "Edit Movie"}
       open={isModalOpen}
       onCancel={handleCancel}
       width={800}
+      footer={null}
     >
       <Form
         layout="vertical"
         style={{ width: "100%" }}
         initialValues={selectedMovie}
         onFinish={onFinish}
       >
@@ .. @@
             <Form.Item
               label="Movie Name"
               htmlFor="title"
               name="title"
               className="d-block"
-              rules={[{ required: true, message: "Movie name is required!" }]}
+              rules={getValidationRules.required("Movie name")}
             >
               <Input
                 id="title"
                 type="text"
                 placeholder="Enter the movie name"
               ></Input>
             </Form.Item>
           </Col>
           <Col span={24}>
             <Form.Item
               label="Description"
               htmlFor="description"
               name="description"
               className="d-block"
-              rules={[{ required: true, message: "Description is required!" }]}
+              rules={getValidationRules.required("Description")}
             >
               <TextArea
                 id="description"
                 rows="4"
-                placeholder="Enter the  description"
+                placeholder="Enter the description"
               ></TextArea>
             </Form.Item>
           </Col>
@@ .. @@
                 <Form.Item
                   label="Movie  Duration (in min)"
                   htmlFor="duration"
                   name="duration"
                   className="d-block"
-                  rules={[
-                    { required: true, message: "Movie duration  is required!" },
-                  ]}
+                  rules={getValidationRules.required("Movie duration")}
                 >
                   <Input
                     id="duration"
                     type="number"
                     placeholder="Enter the movie duration"
+                    min={1}
                   ></Input>
                 </Form.Item>
               </Col>
               <Col span={8}>
                 <Form.Item
-                  label="Select Movie Lanuage"
+                  label="Select Movie Language"
                   htmlFor="language"
                   name="language"
                   className="d-block"
-                  rules={[
-                    { required: true, message: "Movie language  is required!" },
-                  ]}
+                  rules={getValidationRules.required("Movie language")}
                 >
                   <Select
                     id="language"
-                    defaultValue="Select Language"
+                    placeholder="Select Language"
                     style={{ width: "100%", height: "45px" }}
-                    onChange={handleChange}
-                    options={[
-                      { value: "English", label: "English" },
-                      { value: "Hindi", label: "Hindi" },
-                      { value: "Punjabi", label: "Punjabi" },
-                      { value: "Telugu", label: "Telugu" },
-                      { value: "Bengali", label: "Bengali" },
-                      { value: "German", label: "German" },
-                    ]}
+                    options={LANGUAGES}
                   />
                 </Form.Item>
               </Col>
               <Col span={8}>
                 <Form.Item
                   label="Release Date"
                   htmlFor="releaseDate"
                   name="releaseDate"
                   className="d-block"
-                  rules={[
-                    {
-                      required: true,
-                      message: "Movie Release Date is required!",
-                    },
-                  ]}
+                  rules={getValidationRules.required("Release date")}
                 >
                   <Input
                     id="releaseDate"
                     type="date"
                     placeholder="Choose the release date"
                   ></Input>
                 </Form.Item>
               </Col>
@@ .. @@
                 <Form.Item
                   label="Select Movie Genre"
                   htmlFor="genre"
                   name="genre"
                   className="d-block"
-                  rules={[
-                    { required: true, message: "Movie genre  is required!" },
-                  ]}
+                  rules={getValidationRules.required("Movie genre")}
                 >
                   <Select
-                    defaultValue="Select Movie"
+                    placeholder="Select Genre"
                     style={{ width: "100%" }}
-                    onChange={handleChange}
-                    options={[
-                      { value: "Action", label: "Action" },
-                      { value: "Comedy", label: "Comedy" },
-                      { value: "Horror", label: "Horror" },
-                      { value: "Love", label: "Love" },
-                      { value: "Patriot", label: "Patriot" },
-                      { value: "Bhakti", label: "Bhakti" },
-                      { value: "Thriller", label: "Thriller" },
-                      { value: "Mystery", label: "Mystery" },
-                    ]}
+                    options={MOVIE_GENRES}
                   />
                 </Form.Item>
               </Col>
               <Col span={16}>
                 <Form.Item
-                  label="Poster  URL"
+                  label="Poster URL"
                   htmlFor="poster"
                   name="poster"
                   className="d-block"
-                  rules={[
-                    { required: true, message: "Movie Poster  is required!" },
-                  ]}
+                  rules={getValidationRules.url("Poster URL")}
                 >
                   <Input
                     id="poster"
                     type="text"
                     placeholder="Enter the poster URL"
                   ></Input>
                 </Form.Item>
               </Col>
@@ .. @@
         <Form.Item>
           <Button
             block
             type="primary"
             htmlType="submit"
             style={{ fontSize: "1rem", fontWeight: "600" }}
           >
-            Submit the Data
+            {formType === "add" ? "Add Movie" : "Update Movie"}
           </Button>
           <Button className="mt-3" block onClick={handleCancel}>
             Cancel
           </Button>
         </Form.Item>
       </Form>
     </Modal>
   );
 };
+
 export default MovieForm;