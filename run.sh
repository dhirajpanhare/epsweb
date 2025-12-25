#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

case "$1" in
  install)
    echo -e "${BLUE}Installing dependencies...${NC}"
    echo -e "${GREEN}Installing backend dependencies...${NC}"
    cd backend && npm install
    echo -e "${GREEN}Installing frontend dependencies...${NC}"
    cd ../frontend && npm install
    echo -e "${GREEN}All dependencies installed!${NC}"
    ;;
    
  dev)
    echo -e "${BLUE}Starting development servers...${NC}"
    echo -e "${GREEN}Starting backend on port 3000...${NC}"
    echo -e "${GREEN}Starting frontend on port 5173...${NC}"
    trap 'kill 0' EXIT
    cd backend && npm run dev app.js &
    cd frontend && npm run dev &
    wait
    ;;
    
  backend)
    echo -e "${BLUE}Starting backend server...${NC}"
    cd backend && npm start
    ;;
    
  frontend)
    echo -e "${BLUE}Starting frontend server...${NC}"
    cd frontend && npm run dev
    ;;
    
  build)
    echo -e "${BLUE}Building frontend for production...${NC}"
    cd frontend && npm run build
    echo -e "${GREEN}Build complete!${NC}"
    ;;
    
  clean)
    echo -e "${BLUE}Cleaning node_modules and build files...${NC}"
    rm -rf backend/node_modules frontend/node_modules frontend/dist
    echo -e "${GREEN}Clean complete!${NC}"
    ;;
    
  *)
    echo -e "${BLUE}Usage: ./run.sh [command]${NC}"
    echo ""
    echo "Available commands:"
    echo "  install   - Install all dependencies"
    echo "  dev       - Run both frontend and backend in development mode"
    echo "  backend   - Run only backend server"
    echo "  frontend  - Run only frontend server"
    echo "  build     - Build frontend for production"
    echo "  clean     - Remove node_modules and build files"
    ;;
esac
