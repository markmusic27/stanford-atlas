# Course API

This is a simple wrapper API wrapper around the `explorecourses` library. Atlas programmatically calls the API to display course information. This is not the MCP server. The MCP server endpoint [https://stanfordmcp.com/mcp](https://stanfordmcp.com/mcp).

### Endpoint

[https://course-api-280200773515.us-west1.run.app/](https://course-api-280200773515.us-west1.run.app/)

### Local Development

```sh
http://localhost:8080/course?id=105750&class_id=7511
```

```sh
Authorization:Bearer {TOKEN}
```

### Deploying to GCP

1. Build the image

```sh
docker buildx build --platform linux/amd64 . -t course-api
```

1. Add a tag

```sh
docker tag course-api:latest us-west1-docker.pkg.dev/stanford-mcp/stanford-mcp/course-api:latest
```

1. Push to Artifact Registry

```sh
docker push us-west1-docker.pkg.dev/stanford-mcp/stanford-mcp/course-api:latest
```