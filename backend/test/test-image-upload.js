const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:8080/api';

// Test image path - make sure to have a test.jpg in the same directory
const TEST_IMAGE_PATH = path.join(__dirname, 'test.jpg');

// Helper function to create FormData with stationery details
const createStationeryFormData = (imagePath, additionalData = {}) => {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    formData.append('name', additionalData.name || 'Test Pen');
    formData.append('description', additionalData.description || 'A test pen for upload');
    formData.append('price', additionalData.price || '19.99');
    formData.append('stock', additionalData.stock || '50');
    formData.append('brand', additionalData.brand || 'TestBrand');
    formData.append('category', additionalData.category || 'Pens');
    return formData;
};

// Test 1: Create stationery item with image
async function testCreateWithImage() {
    try {
        console.log('\nTest 1: Creating stationery item with image...');
        const formData = createStationeryFormData(TEST_IMAGE_PATH);
        
        const response = await axios.post(`${API_URL}/stationery`, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        console.log('✅ Success! Created stationery item with ID:', response.data.id);
        console.log('Image URL:', response.data.imageUrl);
        return response.data;
    } catch (error) {
        console.error('❌ Error creating stationery:', error.response?.data || error.message);
        throw error;
    }
}

// Test 2: Update stationery item with new image
async function testUpdateWithImage(id, oldImage) {
    try {
        console.log('\nTest 2: Updating stationery item with new image...');
        const formData = createStationeryFormData(TEST_IMAGE_PATH, {
            name: 'Updated Test Pen',
            description: 'Updated test description'
        });
        if (oldImage) {
            formData.append('oldImage', oldImage);
        }

        const response = await axios.put(`${API_URL}/stationery/${id}`, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        console.log('✅ Success! Updated stationery item');
        console.log('New image URL:', response.data.imageUrl);
        return response.data;
    } catch (error) {
        console.error('❌ Error updating stationery:', error.response?.data || error.message);
        throw error;
    }
}

// Test 3: Delete stationery item and its image
async function testDelete(id) {
    try {
        console.log('\nTest 3: Deleting stationery item...');
        const response = await axios.delete(`${API_URL}/stationery/${id}`);
        console.log('✅ Success! Deleted stationery item');
        return response.data;
    } catch (error) {
        console.error('❌ Error deleting stationery:', error.response?.data || error.message);
        throw error;
    }
}

// Run all tests
async function runTests() {
    try {
        // Test create
        const created = await testCreateWithImage();
        
        // Wait a bit before updating
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Test update
        const updated = await testUpdateWithImage(created.id, created.image);
        
        // Wait a bit before deleting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Test delete
        await testDelete(created.id);
        
        console.log('\n✨ All tests completed successfully!');
    } catch (error) {
        console.error('\n❌ Test suite failed:', error.message);
    }
}

// Create test image if it doesn't exist
if (!fs.existsSync(TEST_IMAGE_PATH)) {
    // Create a simple 1x1 pixel JPEG
    const buffer = Buffer.from([
        0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
        0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00,
        0x01, 0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4, 0x00, 0x14, 0x00, 0x01, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xC4, 0x00,
        0x14, 0x10, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F, 0x00, 0x7F, 0x00, 0xFF,
        0xD9
    ]);
    fs.writeFileSync(TEST_IMAGE_PATH, buffer);
    console.log('Created test image:', TEST_IMAGE_PATH);
}

// Run the tests
runTests();
