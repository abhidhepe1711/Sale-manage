import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Select,
  Badge,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";

import productData from "D:\\01\\AgSpert\\sale-manage\\src\\SampleData\\Products.json";

const AddModal = ({ onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const initialFormData = {
    invoiceNumber: "",
    date: "",
    customer: "",
    products: [],
    isPaid: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.invoiceNumber) {
      newErrors.invoiceNumber = "Invoice Number is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.customer) {
      newErrors.customer = "Customer is required";
    }
    if (formData.products.length === 0) {
      newErrors.products = "Products are required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Pass the form data to the parent component
    onSave(formData);

    console.log("Save button clicked");
    console.log(formData);

    // Reset the form data
    setFormData(initialFormData);
    setSearchTerm("");
    setFilteredProducts([]);
    setErrors({});
    onClose();
  };

  const filterProductSuggestions = (input) => {
    if (!input) {
      return [];
    }
    return productData.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setFilteredProducts(filterProductSuggestions(value));
  };

  const handleProductSelect = (productName) => {
    setFormData((prevData) => ({
      ...prevData,
      products: [...prevData.products, productName],
    }));
    setSearchTerm("");
    setFilteredProducts([]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      products: "",
    }));
  };

  const handleProductRemove = (productName) => {
    setFormData((prevData) => ({
      ...prevData,
      products: prevData.products.filter((product) => product !== productName),
    }));
  };

  return (
    <>
      <Button onClick={onOpen} mb="7">
        + Sale Order
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sale Order form</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.invoiceNumber} isRequired>
              <FormLabel>Invoice Number</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Invoice Number"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
              />
              {errors.invoiceNumber && (
                <FormErrorMessage>{errors.invoiceNumber}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={errors.date} isRequired>
              <FormLabel>Date</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && (
                <FormErrorMessage>{errors.date}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={errors.customer} isRequired>
              <FormLabel>Select Customer</FormLabel>
              <Select
                placeholder="Select Customer"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
              >
                <option value="Person 1">person 1</option>
                <option value="Person 2">person 2</option>
                <option value="Perosn 3">person 3</option>
              </Select>
              {errors.customer && (
                <FormErrorMessage>{errors.customer}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={errors.products} isRequired>
              <FormLabel>All products</FormLabel>
              <Input
                placeholder="Search Products..."
                value={searchTerm}
                onChange={handleInputChange}
              />
              {filteredProducts.length > 0 && (
                <div>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product.name)}
                      style={{
                        cursor: "pointer",
                        border: "1px solid #ddd",
                        padding: "5px",
                        margin: "5px 0",
                      }}
                    >
                      {product.name}
                    </div>
                  ))}
                </div>
              )}
              {errors.products && (
                <FormErrorMessage>{errors.products}</FormErrorMessage>
              )}
            </FormControl>

            <Stack mt={4}>
              {formData.products.map((product, index) => (
                <Badge
                  key={index}
                  variant="subtle"
                  colorScheme="blue"
                  onClick={() => handleProductRemove(product)}
                  style={{ cursor: "pointer" }}
                >
                  {product} x
                </Badge>
              ))}
            </Stack>
            <Stack direction="row" spacing="5" mt="3">
              <Checkbox
                colorScheme="green"
                name="isPaid"
                isChecked={formData.isPaid}
                onChange={handleCheckboxChange}
              >
                Is Paid
              </Checkbox>
              <Badge colorScheme="green">
                Total Item: {formData.products.length}
              </Badge>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button
              onClick={() => {
                setFormData(initialFormData); // Reset form data
                setErrors({}); // Reset errors
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddModal;
