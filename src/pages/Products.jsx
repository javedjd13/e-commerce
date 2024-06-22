import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDatas } from "../services/fetchData";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Rating, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Margin } from "@mui/icons-material";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const ProductBox = styled(Box)(({ theme }) => ({
  flex: "1 1 calc(25% - 16px)",
  marginBottom: theme.spacing(2),
  minWidth: 200,
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flex: "1 1 calc(50% - 16px)", // 2 items per row on mobile
    minWidth: "calc(50% - 16px)",
    justifyContent: "center", // Center items on mobile screens
    marginLeft: 55,
  },
}));

const Products = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["Products"],
    queryFn: fetchDatas,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      {data.map((data) => (
        <ProductBox key={data.id}>
          <Card sx={{ width: "100%", maxWidth: 345 }}>
            <CardActionArea component={Link} to={`/product/${data.id}`}>
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
                  <Typography variant="body2" sx={{ marginRight: 0.5 }}>
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
        </ProductBox>
      ))}
    </Container>
  );
};

export default Products;

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchDatas } from "../services/fetchData";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import {
//   Box,
//   CardActionArea,
//   Rating,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { Link } from "react-router-dom";

// const Products = () => {
//   const { data, error, isLoading, isError } = useQuery({
//     queryKey: ["Products"],
//     queryFn: fetchDatas,
//   });

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexWrap: "wrap",
//         justifyContent: "center", // Center items for all screen sizes
//         gap: 2,
//         padding: 2,
//       }}
//     >
//       {data.map((data) => (
//         <Box
//           key={data.id}
//           sx={{
//             flex: "1 1 calc(25% - 16px)",
//             mb: 2,
//             minWidth: 200,
//             display: "flex",
//             justifyContent: "center",

//             // marginLeft: 10,
//           }}
//         >
//           <Card sx={{ width: "100%" }}>
//             <CardActionArea component={Link} to={`/product/${data.id}`}>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={data.thumbnail}
//                 alt={data.title}
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {data.title}
//                 </Typography>
//                 <Typography gutterBottom variant="h6" component="div">
//                   {data.price}$
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                   <Typography variant="body2" sx={{ marginRight: 0.5 }}>
//                     Rating:
//                   </Typography>
//                   <Rating
//                     name="read-only"
//                     value={data.rating}
//                     readOnly
//                     precision={0.5}
//                   />
//                   <Typography variant="body2" sx={{ marginLeft: 1 }}>
//                     {data.rating}
//                   </Typography>
//                 </Box>
//                 <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                   {data.description}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default Products;
