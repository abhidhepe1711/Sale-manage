import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import AddModal from "./AddModal";

const Operations = () => {
  const [salesOrders, setSalesOrders] = useState([]);

  // Load salesOrders from localStorage when the component mounts
  useEffect(() => {
    const storedSalesOrders = localStorage.getItem("salesOrders");
    if (storedSalesOrders) {
      setSalesOrders(JSON.parse(storedSalesOrders));
    }
  }, []);

  // Save salesOrders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("salesOrders", JSON.stringify(salesOrders));
  }, [salesOrders]);

  const handleSave = (formData) => {
    setSalesOrders([...salesOrders, formData]);
  };

  return (
    <>
      <Flex justify="center" align="center" height="50vh">
        <Tabs variant="soft-rounded" colorScheme="green">
          <AddModal onSave={handleSave} />

          <TabList>
            <Tab>Active Sale Order</Tab>
            <Tab>Completed Sale Order</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Active Sale Orders</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Customer Name</Th>
                      <Th>Total Items</Th>
                      <Th>Date</Th>
                      <Th>Edit/View</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {salesOrders
                      .filter((order) => !order.isPaid)
                      .map((order, index) => (
                        <Tr key={index}>
                          <Td>{order.invoiceNumber}</Td>
                          <Td>{order.customer}</Td>
                          <Td>{order.products.length}</Td>
                          <Td>{order.date}</Td>
                          <Td>...</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Completed Sale Orders</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Customer Name</Th>
                      <Th>Total Items</Th>
                      <Th>Date</Th>
                      <Th>Edit/View</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {salesOrders
                      .filter((order) => order.isPaid)
                      .map((order, index) => (
                        <Tr key={index}>
                          <Td>{order.invoiceNumber}</Td>
                          <Td>{order.customer}</Td>
                          <Td>{order.products.length}</Td>
                          <Td>{order.date}</Td>
                          <Td>...</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};

export default Operations;
