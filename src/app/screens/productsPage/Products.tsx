import React from "react";
import { Box, Button, Container, Input, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

export default function Products() {
  return (
    <div className={"products"}>
      <Container>
        <Stack direction={"column"} sx={{ alignItems: "center" }}>
          <Stack className={"avatar-big-box"}>
            <Box className="header-spacer" aria-hidden="true" />
            <Box className={"headline"}>Burak Restaurant</Box>
            <Stack className="search-container">
              <form className="search-form" role="search">
                <Input
                  placeholder="Type here"
                  className="search-box"
                  type="search"
                  inputProps={{ "aria-label": "Search dishes" }}
                  disableUnderline
                  endAdornment={
                    <Button className="search-button" type="submit">
                      Search <SearchIcon />
                    </Button>
                  }
                />
              </form>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={"primary"}
                className={"order"}
              >
                New
              </Button>

              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Price
              </Button>

              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button variant={"contained"} color={"secondary"}>
                  Other
                </Button>

                <Button variant={"contained"} color={"secondary"}>
                  Dessert
                </Button>

                <Button variant={"contained"} color={"secondary"}>
                  Drink
                </Button>

                <Button variant={"contained"} color={"secondary"}>
                  Salad
                </Button>

                <Button variant={"contained"} color={"primary"}>
                  Dish
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product, index) => {
                  return (
                    <Stack key={index} className={"product-card"}>
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${product.imagePath})`,
                        }}
                      >
                        <div className={"product-sale"}>LARGE size</div>

                        <Button
                          className={"shop-btn"}
                          aria-label={`Add ${product.productName} to cart`}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            alt=""
                            style={{ display: "flex" }}
                          />
                        </Button>

                        <Button
                          className={"view-btn"}
                          aria-label={`${product.productName} views`}
                        >
                          <Badge badgeContent={20} color="secondary">
                            <RemoveRedEyeIcon />
                          </Badge>
                        </Button>
                      </Stack>

                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>

                        <div className={"product-price"}>
                          <MonetizationOnIcon />
                          {15}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={3}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container>
          <h2 className="brands-heading">Our Family Brands</h2>
          <div className="brands-cards">
            <div className="brand-card">
              <img src="/img/gurme.webp" alt="CZN Burak Gurme" loading="lazy" />
            </div>
            <div className="brand-card">
              <img src="/img/seafood.webp" alt="CZN Burak Seafood" loading="lazy" />
            </div>
            <div className="brand-card">
              <img src="/img/sweets.webp" alt="CZN Burak Sweets" loading="lazy" />
            </div>
            <div className="brand-card">
              <img src="/img/doner.webp" alt="CZN Burak Döner" loading="lazy" />
            </div>
          </div>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357b9a833a5efa59%3A0x8d4ba096cb5cbed4!2sIncheon%20International%20Airport!5e0!3m2!1sen!2skr!4v1793177212192!5m2!1sen!2skr"
              width="1300"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
