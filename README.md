# The Lemonade Stand

This repository demonstrate  application develoment in Docker with .NET Core 6.0 and React 18.

## Componets
- **MSSQL Server (uses port 1433):** 
- **GraphQL Api Server (uses port 8080):** demonstrates
    - Entitty Framework usage
    - Database migration
    - GraphQL implementation with Hot Chocalate
- **React UI (uses port 3000):** it uses mssql server
    - React 18 usage with redux and router
    - Bootstrap 5 usage


## Setting up development environment

This sample is developed in Visual Studio Code with Docker Desktop. Run the command below in comman line , after you opened the source root directory in Docker dev image with Visual Studio Code. 

```
make setup          # To install the dependencies
make run            # To run all components
```
