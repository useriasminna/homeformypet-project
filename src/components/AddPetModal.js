import { Input, Form, Modal } from "antd";
import FormItem from "antd/lib/form/FormItem";

import React, { useState } from "react";
import { auth, db } from "./../utils/firebase";

const { TextArea } = Input;

function AddPetModal({ title, isOpen, setIsOpen }) {
  const [petType, setPetType] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");

  const handleAddPet = async () => {
    db.collection("users").doc(auth.currentUser.uid).collection("pets").add({
      petType: petType,
      name: name,
      age: age,
      description: description,
    });
    setIsOpen(false);
    setPetType("");
    setName("");
    setAge("");
    setDescription("");
  };

  return (
    <Modal
      title={title}
      visible={isOpen}
      onCancel={() => {
        setIsOpen(false);
        setPetType("");
        setName("");
        setAge("");
        setDescription("");
      }}
      onOk={handleAddPet}
    >
      <Form>
        <FormItem
          label="Animal"
          rules={[{ required: true, message: "this field is required" }]}
        >
          <Input
            placeholder="cat/dog/other"
            name="petType"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          />
        </FormItem>
        <FormItem
          label="Name"
          rules={[{ required: true, message: "this field is required" }]}
        >
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormItem>

        <Form.Item
          label="Age"
          rules={[{ required: true, message: "Missing description" }]}
        >
          <Input
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          rules={[{ required: true, message: "Missing description" }]}
        >
          <TextArea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddPetModal;
