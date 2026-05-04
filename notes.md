**NOTES**

## Issues Found
- API Gateway endpoint was misconfigured.
- Lambda did not have the correct IAM permissions.
- CloudWatch logs helped identify the failure.

## Fixes Applied
- Updated Lambda function logic.
- Adjusted IAM role permissions.
- Retested form submission.

## Key Takeaways
- Always check CloudWatch logs first when Lambda fails.
- API Gateway and Lambda permissions must match the intended workflow.
