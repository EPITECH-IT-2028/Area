# How to Contribute

Thank you for your interest in contributing to the Area project! This guide provides detailed steps for adding new views, services, and adhering to code guidelines to ensure consistency and quality across the project.

## Adding a New View

### Web Application

1. **Navigate to the appropriate directory:**
   - Go to `apps/web/app/`.

2. **Create a new folder for the view:**
   - Use a descriptive name for the folder that matches the purpose of the view.
   - Example:
     ```bash
     mkdir apps/web/app/<view-name>
     ```

3. **Add the necessary files:**
   - Create a `page.tsx` file for the main component of the view.
   - If needed, add additional files for styles, subcomponents, or utilities.

4. **Implement the view:**
   - Follow the design specifications provided by the team.
   - Use reusable components from the project where possible.
   - Ensure the view is responsive and accessible.

5. **Update the routing:**
   - Modify the `layout.tsx` file to include the new route.
   - Example:
     ```tsx
     import Link from 'next/link';

     export default function Layout() {
       return (
         <nav>
           <Link href="/<view-name>">New View</Link>
         </nav>
       );
     }
     ```

6. **Test the view:**
   - Verify the functionality and appearance of the view on different devices and screen sizes.
   - Use tools like Chrome DevTools to test responsiveness.

### Mobile Application

1. **Navigate to the appropriate directory:**
   - Go to `apps/mobile/AREA/AREA/Sources/Features/`.

2. **Create a new Swift file:**
   - Use a descriptive name for the folder that matches the purpose of the view.
   - Example:
     ```bash
     mkdir apps/mobile/AREA/AREA/Sources/Features/<FolderName>
     ```
   - Create your file in this new folder like "FileName.swift"

3. **Implement the view:**
   - Use SwiftUI to design the interface.
   - Follow the design specifications provided by the team.
   - Example:
     ```swift
     import SwiftUI

     struct <ViewName>: View {
         var body: some View {
             Text("Hello, <ViewName>!")
         }
     }
     ```

4. **Integrate the view into the navigation:**
   - Update the navigation flow in the `App` or `Config` directory to include the new view.

5. **Test the view:**
   - Run the app on a simulator or physical device to verify functionality and appearance.

## Adding a New Service

1. **Navigate to the backend directory:**
   - Go to `apps/api/src/`.

2. **Generate a new module, controller, and service:**
   - Use the NestJS CLI to generate the necessary files:
     ```bash
     pnpm nest g module <service-name>
     pnpm nest g controller <service-name>
     pnpm nest g service <service-name>
     ```

3. **Implement the service logic:**
   - Add the necessary methods and business logic in the generated service file.
   - Example:
     ```typescript
     import { Injectable } from '@nestjs/common';

     @Injectable()
     export class <ServiceName>Service {
         getData() {
             return 'Service data';
         }
     }
     ```

4. **Expose endpoints in the controller:**
   - Define the routes and link them to the service methods.
   - Example:
     ```typescript
     import { Controller, Get } from '@nestjs/common';
     import { <ServiceName>Service } from './<service-name>.service';

     @Controller('<service-name>')
     export class <ServiceName>Controller {
         constructor(private readonly service: <ServiceName>Service) {}

         @Get()
         getData() {
             return this.service.getData();
         }
     }
     ```

5. **Update the GraphQL schema:**
   - Modify the schema in `apps/api/src/graphql/queries/` to include the new service.
   - Example:
     ```graphql
     type Query {
         getServiceData: String
     }
     ```

6. **Test the service:**
   - Write unit tests for the service and controller.
   - Use tools like Postman or Hasura Console to verify the endpoints.

## Code Guidelines

1. **Code Style:**
   - Use the provided ESLint and Prettier configurations to ensure consistent formatting.
   - Run the following command to check for linting errors:
     ```bash
     pnpm lint
     ```

2. **Commit Messages:**
   - Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
   - Example:
     ```
     feat(api): add user authentication service
     fix(web): resolve layout issue on mobile devices
     ```

3. **Testing:**
   - Write unit tests for all new features and services.
   - Run the test suite before pushing changes:
     ```bash
     pnpm test
     ```

4. **Documentation:**
   - Update the relevant documentation files for any new features or changes.
   - Ensure the documentation is clear and concise.

5. **Pull Requests:**
   - Ensure your branch is up-to-date with the `dev` branch.
   - Create a pull request with a clear description of the changes.
   - Request reviews from relevant team members.

By following these detailed steps, you can contribute effectively to the Area project. Thank you for your contributions!