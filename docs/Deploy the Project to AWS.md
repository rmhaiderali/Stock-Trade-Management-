# How to Deploy the Project to AWS

This guide will help you deploy your project to an AWS EC2 instance. Follow these steps to ensure a smooth deployment process.

## Steps to Deploy the Project

### 1. Create an AWS EC2 Instance

#### Selecting Resources for the Server
- **Instance Type**: Choose an instance type that suits your application's needs. For a typical Node.js application, `t2.micro` is a good starting point for testing and small-scale production, but you may need a larger instance for higher traffic.
- **AMI (Amazon Machine Image)**: Use an AMI with Ubuntu 20.04 LTS or another Linux distribution you are comfortable with.
- **Storage**: Allocate appropriate storage based on your application's requirements. Typically, 8-16 GB of storage is sufficient for the application and dependencies.
- **Security Group**: Configure the security group to allow inbound traffic on the necessary ports (e.g., 80 for HTTP, 443 for HTTPS, 22 for SSH).

To create an EC2 instance:
1. Sign in to the AWS Management Console.
2. Navigate to the EC2 Dashboard.
3. Click on "Launch Instance."
4. Choose an Amazon Machine Image (AMI).
5. Select an Instance Type.
6. Configure Instance Details.
7. Add Storage.
8. Configure Security Group.
9. Review and Launch.

### 2. Connect to the EC2 Instance
Once your instance is running, connect to it using Browser or Terminal (SSH).

### 3. Follow All Instructions Provided in "How to Start the Project.md" File
Once connected to the EC2 instance, follow the setup instructions as provided in the "How to Start the Project.md" file:

1. **Install Dependencies**: 
    ```bash
    sudo apt update
    sudo apt install git nodejs npm -y
    sudo npm install -g pm2
    ```
2. **Clone the Repository**: 
    ```bash
    git clone <repository-url>
    cd <project-directory>
    npm install
    ```
3. **Create a .env File**: 
    ```bash
    touch .env
    ```
4. **Copy Template from .env.example**: 
    ```bash
    cp .env.example .env
    ```
5. **Add Values Corresponding to Variables**: 
    Edit the `.env` file with your environment-specific values.

### 4. Use PM2 to Run the Server as a Background Process
Instead of starting the server with `npm run dev` or `npm run start`, use PM2 to manage your Node.js application as a background process.

#### Start the Server
Run the following command to start the server using PM2:
```bash
sudo npm run pm2:s
```

#### View Server Logs
To view the server logs, use:
```bash
sudo npm run pm2:l
```

#### Stop the Server
To stop the server, run:
```bash
sudo npm run pm2:d
```

## Summary
1. **Create an AWS EC2 Instance**: Choose the appropriate instance type, AMI, and configure the security group.
2. **Connect to the EC2 Instance**: Use SSH to connect to your instance.
3. **Follow Setup Instructions**: Follow the instructions in the "How to Start the Project.md" file.
4. **Use PM2 to Run the Server**:
   - Start the server: `sudo npm run pm2:s`
   - View server logs: `sudo npm run pm2:l`
   - Stop the server: `sudo npm run pm2:d`

By following these steps, you will successfully deploy your project to an AWS EC2 instance, ensuring it runs efficiently as a background process using PM2.