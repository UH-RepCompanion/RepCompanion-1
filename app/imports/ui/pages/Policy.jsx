import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Policy = () => (
  <Container className="aboutBackground w-50 h-50 infofooter" style={{ backgroundColor: 'light' }}>
    <Row className="text-center">
      <Col className="pt-5">
        <h1><strong>UH RepCompanion</strong></h1>
        <h2 className="m-4">Privacy Policy</h2>
        {/* eslint-disable-next-line max-len */}
        <p className="m-5">

          This Privacy Policy describes how the UH RepCompanion application collects, uses, and protects your personal information when you use UH RepCompanion.
        </p>
        <h4>Terms & Conditions</h4>

        <p className="m-5"> Please review our Terms & Conditions under our Terms of Service or by clicking&nbsp;
          <a href="/terms&conditions" className="link">
            here
          </a>
          .
        </p>
        <h4>Registration Policy</h4>

        <p className="m-5">We do not collect user&apos;s passwords. We will never ask for your password associated with your University of Hawai&apos;i (UH) account.

          To access certain features of UH RepCompanion, you are required to sign up with your valid University of Hawai&apos;i email address. By doing so, you agree to abide by the terms and conditions set forth by the University of
          Hawai&apos;i.
        </p>

        <h4>Use of Personal Information</h4>

        <p className="m-5">UH RepCompanion will never ask for, collect, or store personal information such as driver&apos;s license numbers, Social Security numbers, birth dates, or other sensitive
          identity-related information. You should not relay any personal information
          of this nature through our UH RepCompanion nor with other users on the the app.
        </p>

        <h4>Security of Your Information</h4>

        <p className="m-5">We are committed to ensuring the security of any information associated with your profile page.
          However, we are unable to ensure security measures beyond our domain.
          UH RepCompanion can ensure the prevention of unauthorized access, disclosure,
          or destruction of your personal information. However, the security of user information
          is regulated by the user. By signing up to UH RepCompanion, you are willing to
          display your UH email, name, social links if applicable, and any other personal
          information you provide.
        </p>

        <h4>Changes to This Privacy Policy</h4>

        <p className="m-5">We reserve the right to update or change our Privacy Policy at any time. Any changes will be effective immediately upon posting the updated Privacy Policy for UH RepCompanion.

          By using UH RepCompanion, you acknowledge that you have read and understood this Privacy Policy and agree to its terms and conditions.
        </p>
        <p className="m-5">
          Last updated: [04/16/2024]
        </p>
      </Col>
    </Row>
  </Container>
);

export default Policy;
