import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const ProductDialog = ({ open, handleClose, product, handleSave }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            name="name"
            label="Product Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="Paper">Paper</MenuItem>
              <MenuItem value="Writing">Writing</MenuItem>
              <MenuItem value="Art">Art Supplies</MenuItem>
              <MenuItem value="Office">Office Supplies</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            name="stock"
            label="Stock"
            type="number"
            fullWidth
            value={formData.stock}
            onChange={handleChange}
          />
          <TextField
            name="description"
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteConfirmDialog = ({ open, handleClose, handleConfirm }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
      Are you sure you want to delete this product? This action cannot be undone.
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleConfirm} color="error" variant="contained">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Notebook', category: 'Paper', price: 200, stock: 100, description: 'High-quality notebook' },
    { id: 2, name: 'DIY & Crafting Kits', category: 'Writing', price: 400, stock: 50, description: 'Premium DIY set' },
    { id: 3, name: 'Fun & Kawai Stationery', category: 'Writing', price: 500, stock: 5, description: 'Colorful set' },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleAddEdit = (product = null) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleSave = (formData) => {
    if (selectedProduct) {
      // Edit existing product
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? { ...formData, id: p.id } : p
      ));
      showSnackbar('Product updated successfully');
    } else {
      // Add new product
      setProducts([...products, { ...formData, id: products.length + 1 }]);
      showSnackbar('Product added successfully');
    }
  };

  const handleConfirmDelete = () => {
    setProducts(products.filter(p => p.id !== selectedProduct.id));
    setDeleteDialogOpen(false);
    showSnackbar('Product deleted successfully', 'info');
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleAddEdit()}
        >
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>Rs.{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleAddEdit(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(product)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProductDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        product={selectedProduct}
        handleSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        handleConfirm={handleConfirmDelete}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Products;
