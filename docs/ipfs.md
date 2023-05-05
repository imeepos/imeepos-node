使用 Docker Compose 运行 IPFS 容器会更加便捷，它允许您将 IPFS 节点的多个服务组合到单个 Compose 文件中。

以下是一些使用 Docker Compose 生成 IPFS 容器的简单步骤：

1. 创建 docker-compose.yml 文件
在任意目录下创建一个名为 docker-compose.yml 的文件，并编写以下代码：

```
version: '3'

services:
  ipfs:
    container_name: ipfs
    image: ipfs/go-ipfs
    volumes:
      - ./ipfs-data:/data/ipfs
    ports:
      - "4001:4001"
      - "8080:8080"
      - "8090:8090"
    restart: always
    command: ["--migrate=true", "--routing=dhtclient", "--enable-pubsub-experiment", "--enable-gc"]
```

这将创建一个 IPFS 服务，并会映射容器的 IPFS 数据目录到主机上的 ./ipfs-data 目录中。此外，该服务将在本地主机上暴露端口4001、8080和8090，以便对 IPFS 的访问。

2. 启动 IPFS 容器
在终端或命令提示符窗口中，跳转至 docker-compose.yml 文件所在目录，并执行以下命令启动 IPFS 容器：

```
docker-compose up -d
```

这将创建并启动 IPFS 容器。

3. 连接到 IPFS Web UI
在任何现代 Web 浏览器中，访问 http://localhost:5001/webui 来连接 IPFS Web UI，以便管理 IPFS 容器和其内容。

这是使用 Docker Compose 在 Docker 中运行 IPFS 容器的简单步骤。您还可以使用其他配置选项来自定义 IPFS 部署并满足您的特定需求。