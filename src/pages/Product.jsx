import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../services/fetchData";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Rating } from "@mui/material";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["Product", id],
    queryFn: () => fetchData(id),
  });

  if (isLoading) {
    return <div>Loading__Product...</div>;
  }

  if (isError) {
    return <div>Error__Error: {error.message}</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh", // Center content vertically and horizontally
      }}
    >
      <Box key={data.id} sx={{ mb: 2, minWidth: 400 }}>
        <Card sx={{ minHeight: "300px", width: "300px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={data.thumbnail}
              alt={data.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {data.price}$
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="body2" sx={{ marginRight: 1 }}>
                  Rating:
                </Typography>
                <Rating
                  name="read-only"
                  value={data.rating}
                  readOnly
                  precision={0.5}
                />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  {data.rating}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {data.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default Product;

//
// import React from "react";
// import Footer from "../components/Footer";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { Button, Skeleton } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import Header from "../components/Header";

// const Product = () => {
//   const params = useParams();

//   // Mutation
//   const mutation = useMutation({
//     mutationFn: (newProduct) => {
//       return axios.put(
//         `https://dummyjson.com/products/${params.productId}`,
//         newProduct
//       );
//     },
//   });

//   const fetchProduct = async () => {
//     const response = await axios.get(
//       `https://dummyjson.com/products/${params.productId}`
//     );
//     return response.data;
//   };

//   const {
//     isLoading,
//     error,
//     data: product,
//   } = useQuery({
//     queryKey: ["product", params.productId], // unique key for this query
//     queryFn: fetchProduct, // function that returns a promise or the data
//     staleTime: 10000,
//   });

//   if (isLoading) {
//     // Loading state, displaying Skeleton

//     return (
//       <>
//         <Header />
//         <div style={{ height: "85vh" }}>
//           <div
//             className="card"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Card sx={{ maxWidth: 345, marginTop: 4, cursor: "pointer" }}>
//               <Skeleton
//                 variant="rectangular"
//                 sx={{
//                   height: 65,
//                   width: 345,
//                 }}
//                 animation="wave"
//               />
//               <CardContent>
//                 <Skeleton variant="text" animation="wave" height={60} />
//                 <Skeleton variant="text" animation="wave" height={100} />
//                 <Skeleton variant="text" animation="wave" height={60} />
//               </CardContent>
//               <div className="card-btn" style={{ textAlign: "center" }}>
//                 <Skeleton
//                   variant="rectangular"
//                   animation="wave"
//                   height={36}
//                   width={350}
//                 />
//               </div>
//             </Card>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (error) return <div>{error.message}</div>;

//   if (mutation.isLoading) return <div>Updating...</div>;

//   if (mutation.isError) return <div>{mutation.error.message}...</div>;

//   return (
//     <>
//       <Header />
//       <div style={{ height: "85vh" }}>
//         <div
//           className="card"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Card sx={{ maxWidth: 345, marginTop: 4, cursor: "pointer" }}>
//             <CardMedia
//               sx={{ height: 140 }}
//               image={product?.thumbnail}
//               alt={product?.title}
//               title={product?.title}
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 {` ${product?.title}`}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {product?.description}
//               </Typography>
//               <Typography sx={{ marginTop: "0.2em" }}>
//                 {`${product?.price}$`}
//               </Typography>
//             </CardContent>
//             <div className="card-btn" style={{ textAlign: "center" }}>
//               <Button
//                 onClick={() => {
//                   mutation.mutate({ title: "Updated product" });
//                 }}
//                 variant="contained"
//                 sx={{
//                   marginBottom: "15px",
//                 }}
//               >
//                 Create product
//               </Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Product;
