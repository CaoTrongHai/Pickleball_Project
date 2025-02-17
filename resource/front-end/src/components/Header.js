import React from "react";
import { Nav, Form, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 

export default function Header() {
   
  return (
    <div>
      <Navbar expand="lg" style={{ backgroundColor: "red" }}>
        <Container>
          <Link to={"/"}>
            <Navbar.Brand>
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: "40px",
                  width: "76px",
                  marginTop: "5px",
                  marginRight: "5px",
                }}
              ></img>
            </Navbar.Brand>
          </Link>
          <Navbar.Brand
            style={{
              color: "white",
              marginRight: "90px",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              letterSpacing: "1px",
              transition: "color 0.3s ease",
            }}
          >
            Pickleball Store
          </Navbar.Brand>
          <Form.Control
            type="text"
            placeholder="Nhập tên vợt Pickleball cần tìm"
            style={{ width: "320px", marginRight: "10px" }}
          />
          <i
            style={{ color: "white", marginRight: "30px" }}
            class="bi bi-search"
          ></i>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <i
                style={{ color: "white", marginTop: "5px", fontSize: "1.5rem" }}
                class="bi bi-info-circle-fill"
              ></i>
              <Nav.Link href="#home" style={{ color: "white" }}>
                Thông tin hay
              </Nav.Link>{" "}
              <i
                className="bi bi-journal-text"
                style={{ color: "white", fontSize: "1.5rem" }}
              ></i>
              <Nav.Link href="#link" style={{ color: "white" }}>
                Chính sách mua hàng
              </Nav.Link>{" "}
              <i
                style={{ color: "white", fontSize: "1.5rem" }}
                className="bi bi-bag-heart"
              ></i>
              <Nav.Link href="#link" style={{ color: "white" }}>
                Giỏ hàng
              </Nav.Link>{" "}
              <i
                style={{ color: "white", fontSize: "1.5rem" }}
                class="bi bi-person"
              ></i>
              <Nav.Link href="/login" style={{ color: "white" }}>
                Đăng nhập
              </Nav.Link>{" "}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Nav
        className="justify-content-center"
        style={{ backgroundColor: "#424242" }}
        

      ></Nav>
    </div>
  );
}
