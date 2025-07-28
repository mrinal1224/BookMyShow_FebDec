@@ .. @@
 import { useEffect, useState } from "react";
 import { hideLoading, showLoading } from "../redux/loaderSlice";
 import { useDispatch } from "react-redux";
 import { getAllMovies } from "../calls/movies";
-import { message, Row, Col, Input } from "antd";
-import { useNavigate } from "react-router-dom";
+import { message, Row, Col, Input, Select } from "antd";
 import { SearchOutlined } from "@ant-design/icons";
-import moment from "moment";
+import MovieCard from "../components/movies/MovieCard";
+import EmptyState from "../components/common/EmptyState";
+import { MOVIE_GENRES, LANGUAGES } from "../utils/constants";
+import { debounce } from "../utils/helpers";

 const Home = () => {
   const [movies, setMovies] = useState(null);
   const [searchText, setSearchText] = useState("");
+  const [filteredMovies, setFilteredMovies] = useState(null);
+  const [selectedGenre, setSelectedGenre] = useState("");
+  const [selectedLanguage, setSelectedLanguage] = useState("");
   const dispatch = useDispatch();
-  const navigate = useNavigate();

   const getData = async () => {
@@ .. @@
     }
   };

-  const handleSearch = (e) => {
-    setSearchText(e.target.value);
-    console.log(searchText);
+  const filterMovies = () => {
+    if (!movies) return;
+    
+    let filtered = movies.filter((movie) =>
+      movie.title.toLowerCase().includes(searchText.toLowerCase())
+    );
+
+    if (selectedGenre) {
+      filtered = filtered.filter(movie => movie.genre === selectedGenre);
+    }
+
+    if (selectedLanguage) {
+      filtered = filtered.filter(movie => movie.language === selectedLanguage);
+    }
+
+    setFilteredMovies(filtered);
   };

+  const debouncedSearch = debounce((value) => {
+    setSearchText(value);
+  }, 300);
+
+  const handleSearch = (e) => {
+    debouncedSearch(e.target.value);
+  };
+
+  useEffect(() => {
+    filterMovies();
+  }, [movies, searchText, selectedGenre, selectedLanguage]);
+
   useEffect(() => {
     getData();
   }, []);

   return (
     <>
-      <Row className="justify-content-center w-100">
-        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
+      {/* Search and Filter Section */}
+      <Row className="justify-content-center w-100 mb-4">
+        <Col xs={{ span: 24 }} lg={{ span: 20 }}>
+          <Row gutter={16}>
+            <Col xs={24} md={12}>
+              <Input
+                placeholder="Search for movies..."
+                onChange={handleSearch}
+                prefix={<SearchOutlined />}
+                size="large"
+              />
+            </Col>
+            <Col xs={12} md={6}>
+              <Select
+                placeholder="Select Genre"
+                onChange={setSelectedGenre}
+                allowClear
+                size="large"
+                style={{ width: '100%' }}
+                options={MOVIE_GENRES}
+              />
+            </Col>
+            <Col xs={12} md={6}>
+              <Select
+                placeholder="Select Language"
+                onChange={setSelectedLanguage}
+                allowClear
+                size="large"
+                style={{ width: '100%' }}
+                options={LANGUAGES}
+              />
+            </Col>
+          </Row>
+        </Col>
+      </Row>
+
+      {/* Movies Grid */}
+      {filteredMovies && filteredMovies.length === 0 ? (
+        <EmptyState
+          title="No movies found"
+          description="Try adjusting your search criteria or filters"
+        />
+      ) : (
+        <Row justify="center" gutter={[16, 16]}>
+          {filteredMovies &&
+            filteredMovies.map((movie) => (
+              <Col key={movie._id}>
+                <MovieCard movie={movie} />
+              </Col>
+            ))}
+        </Row>
+      )}
+    </>
+  );
+};
+
+export default Home;
+