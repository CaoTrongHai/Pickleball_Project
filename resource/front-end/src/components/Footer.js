import React from "react";
import { Row, Col, Container, Alert } from "react-bootstrap";
export default function Footer() {
  return (
    <div>
      <Container fluid>
        <Alert variant="light">
          <Row>
            <Col md={3}>
              <h5>Thông tin liên hệ</h5>
              <p>
                Địa chỉ: Thành phố Hà Tĩnh
                <br />
                Điện thoại: 0977652003
                <br />
                Email: tronghaipdp@gmail.com
              </p>
            </Col>
            <Col md={3}>
              <h5>Liên kết nhanh</h5>
              <ul>
                <li>
                  <a href="/">Trang chủ</a>
                </li>
                <li>
                  <a href="/">Sản phẩm</a>
                </li>
                <li>
                  <a href="/">Khuyến mãi</a>
                </li>
                <li>
                  <a href="/">Liên hệ</a>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Thông tin công ty</h5>
              <ul>
                <li>
                  <a href="/">Giới thiệu</a>
                </li>
                <li>
                  <a href="/">Chính sách bảo mật</a>
                </li>
                <li>
                  <a href="/">Điều khoản sử dụng</a>
                </li>
                <li>
                  <a href="/">Hỗ trợ khách hàng</a>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Kết nối với chúng tôi</h5>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a href="/">
                    <i className="bi bi-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/">
                    <i className="bi bi-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/">
                    <i className="bi bi-instagram"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <p>&copy; 2025 Trong Hai Pickleball. All rights reserved.</p>
            </Col>
          </Row>
        </Alert>
      </Container>
    </div>
  );
}
