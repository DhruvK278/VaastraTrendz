# VaastraTrendz API QA Automation

This repository contains the official Postman Test Collection for the VaastraTrendz backend API, designed for Quality Assurance and functional test automation.

## What is Tested?

The collection directly exercises the real Next.js/Express backend endpoints and specifically validates:

1. **Order Processing (`/api/orders`)**
   - **Happy Path:** Validates successful order creation and confirms the expected structure of the response JSON.
   - **Invalid Input:** Ensures correct HTTP 400 rejection and detailed error messages when required payload arrays (like `items`) are missing.

2. **ReAct Support Agent (`/api/support`)**
   - **Ticket Creation (`/create`):** Validates the Zod schema (`CreateTicketSchema`). Tests successful ticket creation and invalid payloads (e.g., incorrect enums for issue categories, missing mandatory customer fields).
   - **Agent Chat (`/chat`):** Exercises the LangGraph conversational ReAct agent. Tests successful processing of valid chat history and confirms 400 Bad Request triggers when the payload lacks the required `messages` array.
   - **General List & Retrieval (`/list`, `/run/:id`):** Tests GET endpoints that lack payload validation (which provides useful insights for QA about potentially unprotected routes).
   - **Manual Override & Auth (`/update/:id`):** Tests the `UpdateTicketSchema` and `requireApiKey` middleware. Validates successful updates by authorized personnel, correctly rejecting unauthorized requests (HTTP 401), and catching invalid resolution enums (HTTP 400).

## How to Run

1. **Import into Postman:** 
   - Open Postman, click **Import**, and select the `VaastraTrendz_API_Tests.postman_collection.json` file.
   
2. **Environment Variables:**
   The collection uses collection-level variables. Click on the imported collection, go to the **Variables** tab, and configure:
   - `baseUrl`: Set to your local server (default is `http://localhost:3001` based on `server.ts`).
   - `adminApiKey`: Set this to match your `ADMIN_API_KEY` defined in the `.env` file to pass the authentication tests for the Update Ticket endpoint.

3. **Run the Collection:**
   - Click on the collection name and click **Run**.
   - Postman will execute all requests sequentially and run the `pm.test()` assertions to validate the actual response status codes and schema structures against expected behavior.

## Test Validation Strategy

Every test includes Postman test scripts (using `pm.test()`) that assert:
- The expected HTTP status code (e.g., 200/201 for success, 400 for bad input, 401 for unauthorized).
- The presence and correct data type of expected keys in the JSON response payload.
- The literal string contents of error messages for negative testing, ensuring the validation logic correctly reports *why* a request failed.
