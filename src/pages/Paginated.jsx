import axios from "axios";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query"; // Assuming you are using react-query

const Paginated = () => {
  // Fetch search parameters from URL
  const [searchParams, setSearchParams] = useSearchParams({
    skip: 0,
    limit: 4,
  });

  // Parse search parameters
  const skip = parseInt(searchParams.get("skip") || 0);
  const limit = parseInt(searchParams.get("limit") || 0);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  // Fetch categories using useQuery hook
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await fetch("https://dummyjson.com/products/categories").then(
        (res) => res.json()
      );
    },
  });

  // Fetch products based on search parameters and selected category
  const { data: products } = useQuery({
    queryKey: [
      "products",
      limit,
      skip,
      searchParams.get("q"),
      selectedCategory,
    ],
    queryFn: async () => {
      let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${searchParams.get(
        "q"
      )}`;
      if (selectedCategory) {
        url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`;
      }
      return await axios.get(url).then((r) => r.data);
    },
    placeholderData: keepPreviousData,
    staleTime: 20000,
  });

  // Handle category selection change
  const handleCategoryChange = (e) => {
    const categorySlug = e.target.value;
    setSearchParams((prev) => {
      prev.set("skip", 0);
      prev.delete("q");
      prev.set("category", categorySlug);
      return prev;
    });
    setSelectedCategory(categorySlug); // Update selected category state
  };

  // Handle previous button click
  const handlePrevClick = () => {
    setSearchParams((prev) => {
      prev.set("skip", Math.max(skip - limit, 0));
      return prev;
    });
  };

  // Handle next button click
  const handleNextClick = () => {
    setSearchParams((prev) => {
      prev.set("skip", skip + limit);
      return prev;
    });
  };

  return (
    <Box>
      {/* Search Products Input */}
      <Box display="flex" justifyContent="center" margin="20px 0">
        <TextField
          size="small"
          label="Search Products"
          variant="outlined"
          onChange={debounce((e) => {
            setSearchParams((prev) => {
              prev.set("q", e.target.value);
              prev.set("skip", 0);
              prev.delete("category");
              return prev;
            });
          }, 1000)}
          type="text"
          name="price"
          id="price"
          className="search-input"
        />
        <Box marginLeft="20px">
          {/* Select Category Dropdown */}
          <FormControl variant="outlined" size="large">
            <InputLabel>Select category</InputLabel>
            <Select
              label="Select category"
              value={selectedCategory} // Bind value to selectedCategory state
              onChange={handleCategoryChange} // Update selectedCategory state on change
            >
              <MenuItem value="">
                <em>Select category</em>
              </MenuItem>
              {categories?.map((category) => (
                <MenuItem key={category.slug} value={category.slug}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* Products Display Section */}
      <Box
        display="flex"
        justifyContent="space-evenly"
        flexWrap="wrap"
        className="products-item"
      >
        {products &&
          products.products.map((product) => (
            <Card
              key={product.id}
              sx={{
                maxWidth: 345,
                marginY: 2,
                marginX: 2,
              }}
            >
              <Link
                to={`/products/${product.id}`}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={product.thumbnail}
                  title={product.title}
                  className="cards"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      mt: 2,
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {product.price}$
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          ))}
      </Box>
      {/* Pagination Buttons */}
      <Box
        display="flex"
        justifyContent="center"
        marginTop="20px"
        marginBottom="10px"
      >
        <Button
          variant="contained"
          disabled={skip === 0} // Disable previous button if already on first page
          onClick={handlePrevClick}
          sx={{ marginRight: "10px" }}
        >
          Prev
        </Button>
        <Button
          variant="contained"
          disabled={
            !products || products.products.length < limit
          } /* Disable next button if there are no more products */
          onClick={handleNextClick}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Paginated;
