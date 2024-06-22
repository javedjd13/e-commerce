// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchData } from "../services/fetchData";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { Box, CardActionArea, Rating } from "@mui/material";
// import { useParams } from "react-router-dom";

// const Product = () => {
//   const { id } = useParams();

//   const { data, error, isLoading, isError } = useQuery({
//     queryKey: ["Product", id],
//     queryFn: () => fetchData(id),
//   });

//   if (isLoading) {
//     return <div>Loading__Product...</div>;
//   }

//   if (isError) {
//     return <div>Error__Error: {error.message}</div>;
//   }
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexWrap: "wrap",
//         justifyContent: "center",
//         gap: 2,
//         minHeight: "100vh", // Center content vertically and horizontally
//       }}
//     >
//       <Box key={data.id} sx={{ flex: "1", mb: 2, minWidth: 400 }}>
//         <Card sx={{ minHeight: "300px", width: "300px" }}>
//           <CardActionArea>
//             <CardMedia
//               component="img"
//               height="140"
//               image={data.thumbnail}
//               alt={data.title}
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 {data.title}
//               </Typography>
//               <Typography gutterBottom variant="h5" component="div">
//                 {data.price}$
//               </Typography>
//               <Typography sx={{ alignItems: "center" }}>
//                 Rating &nbsp;&nbsp;
//                 <Rating name="read-only" value={data.rating} readOnly />
//                 &nbsp;{data.rating}
//               </Typography>
//               <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                 {data.description}
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default Product;

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
