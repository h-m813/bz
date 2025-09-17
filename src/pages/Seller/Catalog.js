import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  Switch,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  useTheme,
  InputAdornment,
  useMediaQuery,
  TableContainer,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Catalog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Buyer categories with their categories and discount (replacing gst)
  const [buyerCategories, setBuyerCategories] = useState([
    { name: "MRP Catalog", discount: "", categories: ["Category 1"] },
    { name: "wholeseller", discount: "10%", categories: ["Category 2"] },
    { name: "retailer", discount: "5%", categories: ["Category 3"] },
    { name: "distributor", discount: "2%", categories: ["Category 4"] },
  ]);
  const [selectedBuyerCategory, setSelectedBuyerCategory] =
    useState("distributor");

  // Products holding buyerCategory field
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      category: "Category 4",
      price: 100,
      gst: "18%",
      stock: 30,
      visible: true,
      buyerCategory: "distributor",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category 2",
      price: 200,
      gst: "12%",
      stock: 0,
      visible: false,
      buyerCategory: "wholeseller",
    },
  ]);

  // Current buyer category object
  const currentBuyer = buyerCategories.find(
    (b) => b.name === selectedBuyerCategory
  );

  // Merge all categories from all buyer categories when MRP Catalog selected, otherwise use current buyer categories
  const categories =
    selectedBuyerCategory === "MRP Catalog"
      ? Array.from(
          new Set(
            buyerCategories.reduce(
              (acc, curr) => [...acc, ...curr.categories],
              []
            )
          )
        )
      : currentBuyer
      ? currentBuyer.categories
      : [];

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Dialog states
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openAddBuyerCategory, setOpenAddBuyerCategory] = useState(false);
  const [openAddProductCategory, setOpenAddProductCategory] = useState(false);

  // Form states
  // Remove gst from Add Product form
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    visible: true,
  });

  // Replace gst with discount in Add Buyer Category form
  const [newBuyerCategory, setNewBuyerCategory] = useState({
    name: "",
    discount: "",
  });

  // Add gst field to Add Product Category form
  const [newProductCategory, setNewProductCategory] = useState({
    name: "",
    gst: "",
  });

  // Edit product states remain unchanged as product has gst (no change requested)
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: "",
    category: "",
    price: "",
    gst: "",
    stock: "",
    visible: true,
  });
  const [openEditProduct, setOpenEditProduct] = useState(false);

  // Actions menu logic
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionProductId, setActionProductId] = useState(null);

  // Filter products logic
  const filteredProducts =
    selectedBuyerCategory === "MRP Catalog"
      ? products.filter(
          (p) => selectedCategory === "All" || p.category === selectedCategory
        )
      : products.filter(
          (p) =>
            p.buyerCategory === selectedBuyerCategory &&
            (selectedCategory === "All" || p.category === selectedCategory)
        );

  // Add Product Handlers (no gst here)
  const handleAddProductOpen = () => setOpenAddProduct(true);
  const handleAddProductClose = () => {
    setOpenAddProduct(false);
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      visible: true,
    });
  };
  const handleAddProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.price ||
      newProduct.stock === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    if (!categories.includes(newProduct.category)) {
      alert(
        "Selected product category does not exist in selected buyer category"
      );
      return;
    }
    // Decide gst for product from productCategory gst if needed (not requested here)
    // For now, keep gst empty or set as "" or you can derive it if needed
    setProducts((prev) => [
      ...prev,
      {
        ...newProduct,
        id: prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        visible: newProduct.visible,
        buyerCategory: selectedBuyerCategory,
        gst: "", // no gst input here per request
      },
    ]);
    handleAddProductClose();
  };

  // Edit Product Handlers (unchanged, still has gst input)
  const handleEditProductOpen = (product) => {
    setEditProductId(product.id);
    setEditProduct({ ...product });
    setOpenEditProduct(true);
    handleActionsMenuClose();
  };
  const handleEditProductClose = () => {
    setOpenEditProduct(false);
    setEditProductId(null);
    setEditProduct({
      name: "",
      category: "",
      price: "",
      gst: "",
      stock: "",
      visible: true,
    });
  };
  const handleEditProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleEditProductSubmit = (e) => {
    e.preventDefault();
    if (
      !editProduct.name ||
      !editProduct.category ||
      !editProduct.price ||
      !editProduct.gst ||
      editProduct.stock === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    if (!categories.includes(editProduct.category)) {
      alert(
        "Selected product category does not exist in selected buyer category"
      );
      return;
    }
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editProductId
          ? {
              ...editProduct,
              price: parseFloat(editProduct.price),
              stock: parseInt(editProduct.stock),
              buyerCategory: selectedBuyerCategory,
            }
          : p
      )
    );
    handleEditProductClose();
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    handleActionsMenuClose();
  };

  // Actions menu open/close
  const handleActionsMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActionProductId(id);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
    setActionProductId(null);
  };

  // Add Buyer Category Handlers now with discount instead of gst
  const handleAddBuyerCategoryOpen = () => setOpenAddBuyerCategory(true);
  const handleAddBuyerCategoryClose = () => {
    setOpenAddBuyerCategory(false);
    setNewBuyerCategory({ name: "", discount: "" });
  };
  const handleAddBuyerCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewBuyerCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddBuyerCategorySubmit = (e) => {
    e.preventDefault();
    if (!newBuyerCategory.name || newBuyerCategory.discount === "") {
      alert("Please fill all fields");
      return;
    }
    if (
      buyerCategories.find(
        (cat) => cat.name.toLowerCase() === newBuyerCategory.name.toLowerCase()
      )
    ) {
      alert("This buyer category already exists");
      return;
    }
    setBuyerCategories((prev) => [
      ...prev,
      {
        name: newBuyerCategory.name,
        discount: newBuyerCategory.discount,
        categories: [],
      },
    ]);
    handleAddBuyerCategoryClose();
  };

  // Add Product Category Handlers with gst field added
  const handleAddProductCategoryOpen = () => setOpenAddProductCategory(true);
  const handleAddProductCategoryClose = () => {
    setOpenAddProductCategory(false);
    setNewProductCategory({ name: "", gst: "" });
  };
  const handleAddProductCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewProductCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddProductCategorySubmit = (e) => {
    e.preventDefault();
    if (!newProductCategory.name || newProductCategory.gst === "") {
      alert("Please fill all fields");
      return;
    }
    if (categories.includes(newProductCategory.name)) {
      alert("This category already exists in current buyer category");
      return;
    }
    setBuyerCategories((prev) =>
      prev.map((cat) =>
        cat.name === selectedBuyerCategory
          ? {
              ...cat,
              categories: [...cat.categories, newProductCategory.name],
            }
          : cat
      )
    );
    handleAddProductCategoryClose();
  };

  // Toggle product visible state
  const handleToggleProductVisible = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p))
    );
  };

  // Switch buyer category and reset selected category
  const handleBuyerCategorySelect = (name) => {
    setSelectedBuyerCategory(name);
    setSelectedCategory("All");
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        px: { xs: 2, sm: 4, md: 7, lg: 12 },
        py: { xs: 2, sm: 4, md: 5 },
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          width: "100%",
          mx: "auto",
          paddingRight: "10px",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            mb: 3,
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={700}
            color="text.primary"
            sx={{ mb: isMobile ? 2 : 0 }}
          >
            Catalog Management
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<CloudUploadOutlinedIcon />}
              sx={{
                bgcolor: "white",
                px: 1.5,
                minWidth: 36,
                fontWeight: 600,
                fontSize: 14,
                borderColor: "#95a4d7",
                "&:hover": {
                  bgcolor: "rgba(30, 94, 255, 0.1)",
                },
              }}
            >
              Upload PDF
            </Button>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                bgcolor: "#1344a4",
                px: 2,
                minWidth: 110,
                fontWeight: 700,
                fontSize: 16,
                "&:hover": {
                  bgcolor: "#0e3877",
                },
              }}
              onClick={handleAddProductOpen}
            >
              Add Product
            </Button>
          </Box>
        </Box>

        {/* Buyer Categories Tabs */}
        <Box
          sx={{
            display: "flex",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: 1,
            mb: 3,
            overflowX: isMobile ? "visible" : "auto",
          }}
        >
          {buyerCategories.map(({ name, discount }) => (
            <Button
              key={name}
              variant={
                selectedBuyerCategory === name ? "contained" : "outlined"
              }
              onClick={() => handleBuyerCategorySelect(name)}
              sx={{
                borderRadius: "40px",
                minWidth: 100,
                maxWidth: isMobile ? "48%" : undefined,
                fontWeight: 700,
                px: 2,
                textAlign: "center",
                whiteSpace: "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.2,
                bgcolor: selectedBuyerCategory === name ? "#1344a4" : "white",
                color: selectedBuyerCategory === name ? "white" : "#1344a4",
                "& .MuiButton-label": {
                  whiteSpace: "normal",
                },
              }}
            >
              <Box>
                {name}
                {discount && <span> | Discount: {discount}</span>}
              </Box>
            </Button>
          ))}
          <Button
            variant="outlined"
            sx={{
              borderRadius: "50%",
              minWidth: 40,
              minHeight: 40,
              px: 0,
              fontWeight: 700,
              color: "#1344a4",
              borderColor: "#1344a4",
              flexShrink: 0,
            }}
            onClick={handleAddBuyerCategoryOpen}
          >
            <AddIcon />
          </Button>
        </Box>

        {/* Product Categories */}
        <Box
          sx={{
            display: "flex",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: 1,
            mb: 3,
            overflowX: isMobile ? "visible" : "auto",
          }}
        >
          <Button
            variant={selectedCategory === "All" ? "contained" : "outlined"}
            onClick={() => setSelectedCategory("All")}
            sx={{
              borderRadius: "40px",
              minWidth: 80,
              maxWidth: isMobile ? "45%" : undefined,
              fontWeight: 700,
              px: 2,
              textAlign: "center",
              whiteSpace: "normal",
            }}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "contained" : "outlined"}
              onClick={() => setSelectedCategory(cat)}
              sx={{
                borderRadius: "40px",
                minWidth: 100,
                maxWidth: isMobile ? "45%" : undefined,
                fontWeight: 700,
                px: 2,
                textAlign: "center",
                whiteSpace: "normal",
              }}
            >
              {cat}
            </Button>
          ))}
          <Button
            variant="outlined"
            sx={{
              borderRadius: "50%",
              minWidth: 40,
              minHeight: 40,
              px: 0,
              fontWeight: 700,
              color: "#1344a4",
              borderColor: "#1344a4",
              flexShrink: 0,
            }}
            onClick={handleAddProductCategoryOpen}
          >
            <AddIcon />
          </Button>
        </Box>

        {/* Product Table */}
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer>
            <Table stickyHeader sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>GST</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Visible</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: "#e7fafc",
                          color: "#a0b7a8",
                          fontWeight: 700,
                          fontSize: 15,
                          borderRadius: 2,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        IMG
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.gst}</TableCell>
                    <TableCell>
                      {product.stock === 0 ? (
                        <Box
                          sx={{
                            bgcolor: "#f8d7da",
                            color: "#842029",
                            borderRadius: 2,
                            py: 0.5,
                            px: 1,
                            fontWeight: 600,
                          }}
                        >
                          Out of Stock
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            bgcolor: "#d1f7dd",
                            color: "#0f6532",
                            borderRadius: 2,
                            py: 0.5,
                            px: 1,
                            fontWeight: 600,
                          }}
                        >
                          {product.stock} units
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.visible}
                        disabled={product.stock === 0}
                        onChange={() => handleToggleProductVisible(product.id)}
                        color="primary"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => handleActionsMenuOpen(e, product.id)}
                        size="small"
                        sx={{ p: 0.5 }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={
                          actionProductId === product.id && Boolean(anchorEl)
                        }
                        onClose={handleActionsMenuClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        PaperProps={{
                          sx: {
                            minWidth: 120,
                            borderRadius: 2,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          },
                        }}
                      >
                        <MenuItem
                          onClick={() => handleEditProductOpen(product)}
                          sx={{ fontSize: 15, px: 2, py: 1, minHeight: 36 }}
                        >
                          <ListItemIcon>
                            <EditIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDeleteProduct(product.id)}
                          sx={{ fontSize: 15, px: 2, py: 1, minHeight: 36 }}
                        >
                          <ListItemIcon>
                            <DeleteIcon fontSize="small" color="error" />
                          </ListItemIcon>
                          <ListItemText>Delete</ListItemText>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Add Product Dialog (GST removed) */}
      <Dialog
        open={openAddProduct}
        onClose={handleAddProductClose}
        fullWidth
        maxWidth="sm"
        scroll="body"
      >
        <DialogTitle>
          Add Product
          <IconButton
            onClick={handleAddProductClose}
            sx={{ position: "absolute", right: 12, top: 12 }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ px: { xs: 1, sm: 3 }, py: 2 }}>
          <Box
            component="form"
            onSubmit={handleAddProductSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleAddProductChange}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Category"
              name="category"
              value={newProduct.category}
              onChange={handleAddProductChange}
              select
              fullWidth
              required
              size="small"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Price"
              name="price"
              value={newProduct.price}
              onChange={handleAddProductChange}
              type="number"
              fullWidth
              required
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
            />
            <TextField
              label="Stock"
              name="stock"
              value={newProduct.stock}
              onChange={handleAddProductChange}
              type="number"
              fullWidth
              required
              size="small"
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Switch
                checked={newProduct.visible}
                onChange={handleAddProductChange}
                name="visible"
                color="primary"
                size="small"
              />
              <Typography>Visible</Typography>
            </Box>
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={handleAddProductClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Add Product
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Add Buyer Category Dialog (Discount field replaces GST) */}
      <Dialog
        open={openAddBuyerCategory}
        onClose={handleAddBuyerCategoryClose}
        fullWidth
        maxWidth="xs"
        scroll="body"
      >
        <DialogTitle>
          Add Buyer Category
          <IconButton
            onClick={handleAddBuyerCategoryClose}
            sx={{ position: "absolute", right: 12, top: 12 }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ px: { xs: 1, sm: 3 }, py: 2 }}>
          <Box
            component="form"
            onSubmit={handleAddBuyerCategorySubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Buyer Category Name"
              name="name"
              value={newBuyerCategory.name}
              onChange={handleAddBuyerCategoryChange}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Discount (%)"
              name="discount"
              value={newBuyerCategory.discount}
              onChange={handleAddBuyerCategoryChange}
              fullWidth
              required
              size="small"
            />
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={handleAddBuyerCategoryClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Add Category
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Add Product Category Dialog (Add GST field) */}
      <Dialog
        open={openAddProductCategory}
        onClose={handleAddProductCategoryClose}
        fullWidth
        maxWidth="xs"
        scroll="body"
      >
        <DialogTitle>
          Add Product Category
          <IconButton
            onClick={handleAddProductCategoryClose}
            sx={{ position: "absolute", right: 12, top: 12 }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ px: { xs: 1, sm: 3 }, py: 2 }}>
          <Box
            component="form"
            onSubmit={handleAddProductCategorySubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Product Category Name"
              name="name"
              value={newProductCategory.name}
              onChange={handleAddProductCategoryChange}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="GST (%)"
              name="gst"
              value={newProductCategory.gst}
              onChange={handleAddProductCategoryChange}
              fullWidth
              required
              size="small"
            />
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={handleAddProductCategoryClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Add Category
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
