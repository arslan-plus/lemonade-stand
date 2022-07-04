setup:
	cd ./api && dotnet build && cd -
	cd ./ui && npm install && cd -

run:
	- fuser -k 8080/tcp
	- fuser -k 3000/tcp
	dotnet run  --project ./api/GraphQL.API/GraphQL.API.csproj  --launch-profile Container --framework net6.0 &
	cd ./ui && npm run-script start &