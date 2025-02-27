import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  LinearProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image_url: '',
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setSnackbar('Error fetching categories', 'error');
    }
  };

  const handleOpenDialog = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image_url: product.image_url,
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        image_url: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const url = selectedProduct
        ? `/api/admin/products/${selectedProduct.id}`
        : '/api/admin/products';
      
      const response = await fetch(url, {
        method: selectedProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showSnackbar(
          `Product ${selectedProduct ? 'updated' : 'created'} successfully`,
          'success'
        );
        fetchProducts();
        handleCloseDialog();
      } else {
        throw new Error('Failed to save product');
      }
    } catch (error) {
      showSnackbar('Error saving product', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/admin/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

        if (response.ok) {
          showSnackbar('Product deleted successfully', 'success');
          fetchProducts();
        } else {
          throw new Error('Failed to delete product');
        }
      } catch (error) {
        showSnackbar('Error deleting product', 'error');
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 130, valueFormatter: (params) => `$${params.value}` },
    { field: 'stock', headerName: 'Stock', width: 130 },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      valueGetter: (params) => {
        const category = categories.find(c => c.id === params.row.category_id);
        return category ? category.name : '';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%', p: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Products</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Product
        </Button>
      </Box>

      <DataGrid
        rows={products}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        loading={loading}
        error={error}
        components={{
          LoadingOverlay: LinearProgress,
        }}
        sx={{
          '& .MuiDataGrid-cell': { py: 1 },
          '& .MuiDataGrid-columnHeaders': { bgcolor: 'background.neutral' },
        }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name="name"
              label="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              name="price"
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              name="stock"
              label="Stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              name="category_id"
              label="Category"
              select
              value={formData.category_id}
              onChange={handleInputChange}
              fullWidth
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="image_url"
              label="Image URL"
              value={formData.image_url}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedProduct ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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
