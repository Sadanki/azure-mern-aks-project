# MERN Application Deployment on Azure Kubernetes Service (AKS)

## 📋 Project Overview
This project demonstrates the complete deployment of a MERN (MongoDB, Express.js, React, Node.js) application using Azure Kubernetes Service (AKS). The application follows a microservices architecture with containerized services managed through Kubernetes orchestration.

![MERN Architecture](https://img.shields.io/badge/Architecture-MERN%20Microservices-blue)
![Kubernetes](https://img.shields.io/badge/Platform-Azure%20AKS-blueviolet)
![Status](https://img.shields.io/badge/Status-Deployed%20Successfully-brightgreen)

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Azure Kubernetes Service                  │
│ ┌─────────────────┐    ┌─────────────────┐                 │
│ │   Frontend      │    │   MongoDB       │                 │
│ │   Service       │◄──►│   Service       │                 │
│ │ (React App)     │    │                 │                 │
│ └─────────────────┘    └─────────────────┘                 │
│          ▲                         ▲                       │
│          │                         │                       │
│          ▼                         ▼                       │
│ ┌─────────────────┐    ┌─────────────────┐                 │
│ │   Hello         │    │   Profile       │                 │
│ │   Service       │    │   Service       │                 │
│ │ (Node.js)       │    │ (Node.js)       │                 │
│ └─────────────────┘    └─────────────────┘                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Services Deployed

1. **Frontend Service**: React-based user interface
2. **Hello Service**: Node.js backend API service
3. **Profile Service**: Node.js backend service for user profiles
4. **MongoDB Service**: Database service for data persistence

## 📂 Repository Structure

```
SampleMERNwithAKS/
├── Backend/
│   ├── helloService/
│   │   ├── Dockerfile
│   │   ├── src/
│   │   └── package.json
│   └── profileService/
│       ├── Dockerfile
│       ├── src/
│       └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── public/
│   ├── src/
│   └── package.json
└── k8s-manifests/
    ├── hello-deployment.yaml
    ├── hello-service.yaml
    ├── profile-deployment.yaml
    ├── profile-service.yaml
    ├── frontend-deployment.yaml
    ├── frontend-service.yaml
    ├── ingress.yaml
    ├── mongo-deployment.yaml
    └── mongo-service.yaml
```

## 🛠️ Implementation Steps

### 1. Application Setup
- Cloned the MERN microservices application from GitHub
- Reviewed and optimized the existing Dockerfiles for each service

### 2. Containerization
**Built Docker images for each service:**
```bash
# Hello Service
docker build -t vignesh342/hello-service:v1 ./Backend/helloService

# Profile Service  
docker build -t vignesh342/profile-service:v1 ./Backend/profileService

# Frontend Service
docker build -t vignesh342/frontend-service:v1 ./frontend
```

### 3. Docker Hub Deployment
**Pushed images to Docker Hub repository:**
```bash
docker push vignesh342/hello-service:v1
docker push vignesh342/profile-service:v1
docker push vignesh342/frontend-service:v1
```

### 4. Kubernetes Manifests
Created comprehensive Kubernetes configuration files including:
- Deployments for each service
- Services for internal and external exposure
- Ingress controller for routing traffic
- MongoDB stateful deployment

### 5. Local Testing with Minikube
Deployed and validated the application locally:
```bash
minikube start
kubectl apply -f k8s-manifests/
minikube service frontend-service --url
```

### 6. Azure Cloud Deployment
**Created AKS cluster:**
```bash
az group create --name MERN-RG --location eastus
az aks create --resource-group MERN-RG --name MERN-Cluster --node-count 2 --enable-addons monitoring
az aks get-credentials --resource-group MERN-RG --name MERN-Cluster
```

**Deployed application to AKS:**
```bash
kubectl apply -f k8s-manifests/
```

### 7. Verification and Validation
- Verified all pods were running successfully
- Confirmed services were properly exposed
- Tested MongoDB connectivity and data persistence
- Validated frontend accessibility through ingress

## 📸 Evidence of Deployment

The repository includes comprehensive screenshots of:
- Docker image building and pushing process
- Kubernetes manifest files
- Local Minikube deployment
- AKS cluster creation and configuration
- Pods, services, and deployments status
- Application accessibility and functionality

## 🌐 Accessing the Application

The deployed application can be accessed through the ingress controller URL:
```
http://<ingress-ip-address>
```

## 📊 Kubernetes Resources

**Pods:**
```
NAME                              READY   STATUS    RESTARTS   AGE
frontend-deployment-xxx-xxxx      1/1     Running   0          5m
hello-deployment-xxx-xxxx         1/1     Running   0          5m  
profile-deployment-xxx-xxxx       1/1     Running   0          5m
mongo-deployment-xxx-xxxx         1/1     Running   0          5m
```

**Services:**
```
NAME               TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)        AGE
frontend-service   LoadBalancer   10.0.12.45     XX.XX.XX.XX     80:30672/TCP   5m
hello-service      ClusterIP      10.0.24.17     <none>          3000/TCP       5m
profile-service    ClusterIP      10.0.38.92     <none>          3001/TCP       5m
mongo-service      ClusterIP      10.0.42.13     <none>          27017/TCP      5m
```

## 🔧 Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Cloud Platform**: Microsoft Azure (AKS)
- **Registry**: Docker Hub

## 📝 Learning Outcomes

- Containerized a MERN application using Docker
- Implemented Kubernetes deployments and services
- Configured ingress for external access
- Deployed to Azure Kubernetes Service (AKS)
- Managed multi-container application orchestration
- Implemented health checks and scalability configurations

## 🔮 Future Enhancements

- Implement CI/CD pipeline with GitHub Actions
- Add monitoring with Prometheus and Grafana
- Implement auto-scaling based on traffic
- Add SSL certification for secure connections
- Implement blue-green deployment strategy

## 📚 References

- [Azure Kubernetes Service Documentation](https://docs.microsoft.com/en-us/azure/aks/)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/home/)
- [Docker Documentation](https://docs.docker.com/)
- [MERN Stack Development](https://www.mongodb.com/mern-stack)

---

**Developed by:** Vignesh  
**GitHub Repository:** [https://github.com/vignesh342/SampleMERNwithAKS](https://github.com/vignesh342/SampleMERNwithAKS)  

*This project was completed as part of the Graded Assignment on MERN Application Using AKS.*