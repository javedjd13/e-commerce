// import React from "react";
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Avatar,
//   Box,
// } from "@mui/material";
// import { styled } from "@mui/system";

// const RootContainer = styled(Container)(({ theme }) => ({
//   paddingTop: theme.spacing(8),
//   paddingBottom: theme.spacing(8),
//   // Add left padding for small screens
//   [theme.breakpoints.down("sm")]: {
//     paddingLeft: theme.spacing(2),
//   },
// }));

// const CustomCard = styled(Card)(({ theme }) => ({
//   marginTop: theme.spacing(4),
//   // Add responsive margin for small screens
//   [theme.breakpoints.down("sm")]: {
//     marginTop: theme.spacing(2),
//   },
// }));

// const CustomAvatar = styled(Avatar)(({ theme }) => ({
//   width: theme.spacing(10),
//   height: theme.spacing(10),
//   marginBottom: theme.spacing(2),
//   // Center avatar on small screens
//   [theme.breakpoints.down("sm")]: {
//     margin: "auto",
//   },
// }));

// const FlexBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   flexDirection: "column",
//   textAlign: "center",
//   margin: theme.spacing(2),
//   // Adjust margin and alignment for small screens
//   [theme.breakpoints.down("sm")]: {
//     marginBottom: theme.spacing(4),
//     alignItems: "center",
//   },
// }));

// const FlexContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "space-around",
//   flexWrap: "wrap",
//   // Change flex direction to column and align items center for small screens
//   [theme.breakpoints.down("sm")]: {
//     flexDirection: "column",
//     alignItems: "center",
//     // Add left padding for small screens
//     paddingLeft: theme.spacing(2),
//   },
// }));

// const About = () => {
//   return (
//     <RootContainer>
//       <Typography variant="h3" align="center" gutterBottom>
//         About Us
//       </Typography>
//       <Typography variant="body1" align="center" paragraph>
//         Welcome to our website! We are committed to providing you with the best
//         service possible.
//       </Typography>
//       <CustomCard>
//         <CardContent>
//           <FlexContainer>
//             <FlexBox>
//               <CustomAvatar alt="Person 1" src="/path/to/image1.jpg" />
//               <Typography variant="h6">Person 1</Typography>
//               <Typography variant="body2">Position</Typography>
//             </FlexBox>
//             <FlexBox>
//               <CustomAvatar alt="Person 2" src="/path/to/image2.jpg" />
//               <Typography variant="h6">Person 2</Typography>
//               <Typography variant="body2">Position</Typography>
//             </FlexBox>
//             <FlexBox>
//               <CustomAvatar alt="Person 3" src="/path/to/image3.jpg" />
//               <Typography variant="h6">Person 3</Typography>
//               <Typography variant="body2">Position</Typography>
//             </FlexBox>
//           </FlexContainer>
//         </CardContent>
//       </CustomCard>
//     </RootContainer>
//   );
// };

// export default About;
import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const RootContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
  //
  // Add responsive margin for small screens
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(10),
  },
}));

const CustomCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  // Add responsive margin for small screens
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(2),
  },
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  marginBottom: theme.spacing(2),
  // Center avatar on small screens
  [theme.breakpoints.down("sm")]: {
    margin: "auto",
  },
}));

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  margin: theme.spacing(2),
  // Adjust margin and alignment for small screens
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(4),
  },
}));

const FlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  // Change flex direction to column and center align items for small screens
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));
// this is login page 
const About = () => {
  return (
    <RootContainer>
      <Typography variant="h3" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Welcome to our website! We are committed to providing you with the best
        service possible.
      </Typography>
      <CustomCard>
        <CardContent>
          <FlexContainer>
            <FlexBox>
              <CustomAvatar alt="Person 1" src="/path/to/image1.jpg" />
              <Typography variant="h6">Person 1</Typography>
              <Typography variant="body2">Position</Typography>
            </FlexBox>
            <FlexBox>
              <CustomAvatar alt="Person 2" src="/path/to/image2.jpg" />
              <Typography variant="h6">Person 2</Typography>
              <Typography variant="body2">Position</Typography>
            </FlexBox>
            <FlexBox>
              <CustomAvatar alt="Person 3" src="/path/to/image3.jpg" />
              <Typography variant="h6">Person 3</Typography>
              <Typography variant="body2">Position</Typography>
            </FlexBox>
          </FlexContainer>
        </CardContent>
      </CustomCard>
    </RootContainer>
  );
};

export default About;
