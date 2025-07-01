Here’s a **step-by-step guide** to installing CatVTON on Windows.

---

### **Step 1: Install Git**
CatVTON requires Git to clone the necessary repositories.

1. Download **Git for Windows**:  
   👉 [https://git-scm.com/download/win](https://git-scm.com/download/win)  
2. Run the installer and follow the default installation steps.
3. After installation, open **Command Prompt (cmd)** and check if Git is installed:  
   ```bash
   git --version
   ```
   If Git is installed correctly, it will show a version number.

---

### **Step 2: Install Python and Conda**
CatVTON requires **Python 3.8** and **Conda**.

1. Download **Anaconda (or Miniconda)**:  
   👉 [https://www.anaconda.com/products/distribution](https://www.anaconda.com/products/distribution)  
2. Install it and **make sure to check the option to "Add Anaconda to PATH"**.
3. Open **Anaconda Prompt** and check if Conda is installed:  
   ```bash
   conda --version
   ```

---

### **Step 3: Clone the CatVTON Repository**
1. Open **Command Prompt** and navigate to a folder where you want to install CatVTON:  
   ```bash
   cd C:\Users\YourUsername\Documents
   ```
2. Clone the CatVTON repository:  
   ```bash
   git clone https://github.com/Zheng-Chong/CatVTON.git
   ```
3. Move into the CatVTON directory:  
   ```bash
   cd CatVTON
   ```

---

### **Step 4: Create and Activate a Conda Environment**
1. Create a new Conda environment with **Python 3.8**:  
   ```bash
   conda create -n catvton python=3.8 -y
   ```
2. Activate the environment:  
   ```bash
   conda activate catvton
   ```

---

### **Step 5: Install Dependencies**
1. Install the required Python packages:  
   ```bash
   pip install -r requirements.txt
   ```
2. Install additional required libraries:  
   ```bash
   pip install torch torchvision torchaudio
   ```

---

You should **clone ComfyUI inside the main project directory** (where you installed CatVTON).  

### **Recommended Folder Structure:**
```
CatVTON/
│── ComfyUI/          <- Clone ComfyUI here
│   ├── custom_nodes/
│   │   ├── Comfyui-CatVTON/  <- Clone CatVTON plugin here
│   ├── models/
│   ├── main.py
│── ...
```

---

### **Step 6: Install ComfyUI**
CatVTON works with **ComfyUI**, a framework for AI-based image processing.

1. Clone the ComfyUI repository:  
   ```bash
   git clone https://github.com/comfyanonymous/ComfyUI.git
   ```
2. Move into the **ComfyUI** folder:  
   ```bash
   cd ComfyUI
   ```
3. Install dependencies for ComfyUI:  
   ```bash
   pip install -r requirements.txt
   ```

---

### **Step 7: Install CatVTON Plugin for ComfyUI**
1. Navigate to the `custom_nodes` folder inside ComfyUI:  
   ```bash
   cd custom_nodes
   ```
2. Clone the ComfyUI-CatVTON plugin repository:  
   ```bash
   git clone https://github.com/pzc163/Comfyui-CatVTON.git
   ```
3. Move into the **Comfyui-CatVTON** folder:  
   ```bash
   cd Comfyui-CatVTON
   ```
4. Install additional dependencies for the plugin:  
   ```bash
   pip install -r requirements.txt
   ```

---

### **Step 8: Download Model Files**
1. Go to the **Releases** section of ComfyUI-CatVTON:  
   👉 [https://github.com/pzc163/Comfyui-CatVTON/releases](https://github.com/pzc163/Comfyui-CatVTON/releases)  
2. Download the required model files.
3. Place the downloaded model files in the `ComfyUI/models/CatVTON` folder.

---

### **Step 9: Start ComfyUI**
1. Navigate back to the **ComfyUI** directory:  
   ```bash
   cd ../../
   ```
2. Run ComfyUI:  
   ```bash
   python main.py
   ```
3. It will start a **local web server**. Open your browser and go to:  
   ```
   http://localhost:8188
   ```

---

### **Step 10: Load CatVTON Workflow**
1. Download the **catvton_workflow.json** file from the Releases page:  
   👉 [https://github.com/pzc163/Comfyui-CatVTON/releases](https://github.com/pzc163/Comfyui-CatVTON/releases)  
2. Open **ComfyUI** and import the **catvton_workflow.json** file.

---

### 🎉 **Done!** 🎉  
Now, you can **start using CatVTON** inside ComfyUI.

🔹 If you face issues, check the official **GitHub README**:  
👉 [https://github.com/Zheng-Chong/CatVTON](https://github.com/Zheng-Chong/CatVTON)

Would you like help troubleshooting any errors? 🚀