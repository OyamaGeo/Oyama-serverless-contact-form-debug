# Oyama-serverless-contact-form-debug
Serverless contact form built with AWS (API Gateway, Lambda, DynamoDB, SNS) with real-world debugging and IAM troubleshooting.



Serverless Contact Form (AWS)

![Architecture Diagram](images/architecture-diagram.png)


**PROJECT OVERVIEW**

This project demonstrates the design, implementation, and troubleshooting of a serverless contact form application built using AWS services.

The primary goal was not just to build a working system, but to simulate real-world failures and systematically debug them, mimicking the responsibilities of a Cloud Support Engineer.

The architecture follows an event-driven serverless model using API Gateway, AWS Lambda, DynamoDB, and SNS.

 **SYSTEM ARCHITECTURE**

This application uses a fully serverless architecture:

- A user submits a contact form via an API endpoint
- The request is processed by a Lambda function
- Data is stored in DynamoDB
- A notification is sent via Amazon SNS

---

Architecture Diagram

![Serverless Architecture Diagram](images/architecture-diagram.png)

---

**DATA FLOW**

1. User submits the contact form via API Gateway (`/submit` endpoint)
2. API Gateway invokes the AWS Lambda function
3. Lambda validates and processes the request
4. Lambda stores the data in DynamoDB
5. Lambda publishes a message to SNS
6. SNS sends an email notification to subscribed users

---

**AWS SERVICES USED**

- Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB
- Amazon SNS (Simple Notification Service)
- AWS Identity and Access Management (IAM)
- Amazon CloudWatch (for logging and monitoring)

---

 **SIMULATED FAILURE SCENARIOS**

This project intentionally included real-world failure conditions to simulate production debugging:

- Missing Lambda dependency (`uuid` module)
- IAM permission errors (SNS publish & DynamoDB write)
- Unconfirmed SNS email subscription
- Lambda timeout configuration issues
- API Gateway integration errors
- CloudWatch log analysis for root cause identification

---

 **TROUBLESHOOTING PROCESS**

The system was debugged using a structured approach:

1. Tested API endpoint via API Gateway console
2. Analyzed Lambda execution logs in CloudWatch
3. Identified dependency and runtime errors
4. Diagnosed IAM permission failures
5. Updated IAM policies using least-privilege principles
6. Confirmed SNS email subscription
7. Adjusted Lambda timeout settings
8. Retested the full workflow successfully

---

**FINAL OUTCOME**

- API Gateway returns 200 OK
- Data is successfully stored in DynamoDB
- SNS notifications are delivered via email
- End-to-end workflow operates reliably

---

 **Key Learnings**

- Understanding serverless architecture and service integration
- Debugging Lambda functions using CloudWatch logs
- Identifying and resolving IAM permission issues
- Applying the principle of least privilege
- Troubleshooting distributed systems effectively
- Moving from “building” to engineering and debugging systems

---

**Project Structure**

```text
broken-contact-form-project/
├── README.md
├── images/
│   └── architecture-diagram.png
├── lambda/
├── template.yaml
└── notes.md
