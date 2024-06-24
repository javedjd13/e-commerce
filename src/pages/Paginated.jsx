import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Header from "../components/Header";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Paginated = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    skip: 0,
    limit: 4,
  });

  const skip = parseInt(searchParams.get("skip") || 0);
  const limit = parseInt(searchParams.get("limit") || 0);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await fetch("https://dummyjson.com/products/categories").then(
        (res) => res.json()
      );
    },
  });

  const { data: products } = useQuery({
    queryKey: ["products", limit, skip, q, category],
    queryFn: async () => {
      let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${q}`;
      if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      }
      return await axios.get(url).then((r) => r.data);

      // fetch(url).then((res) => res.json());
    },
    placeholderData: keepPreviousData, // Keep the previous page of results while loading the next one
    staleTime: 20000,
  });

  const handleMove = (moveCount) => {
    // Next
    // skip = 4, moveCount = 4
    // 4 + 4 = 8

    // Prev
    // skip = 0, moveCount = -4
    // 0 + -4 = -4

    setSearchParams((prev) => {
      prev.set("skip", Math.max(skip + moveCount, 0));
      return prev;
    });
  };
  return (
    <div>
      <Header />
      <div className="products-container">
        <div
          className="search"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
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
          &nbsp; &nbsp; &nbsp;
          <select
            className="border p-2"
            onChange={(e) => {
              setSearchParams((prev) => {
                prev.set("skip", 0);
                prev.delete("q");
                prev.set("category", e.target.value);
                return prev;
              });
            }}
          >
            <option>Select category</option>
            {categories?.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className="products-item"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {products &&
            products.products.map((product, id) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
                key={product.id}
              >
                <Card
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
              </Box>
            ))}
        </div>
      </div>
      <div
        className="btn"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            marginRight: "20px",
          }}
          disabled={skip < limit}
          className="bg-purple-500 px-4 py-1 text-white rounded"
          onClick={() => {
            handleMove(-limit);
          }}
        >
          Prev
        </Button>
        <Button
          disabled={limit + skip >= products?.total}
          className="bg-purple-500 px-4 py-1 text-white rounded"
          onClick={() => {
            handleMove(limit);
          }}
          variant="contained"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Paginated;
