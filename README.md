# Deepfake Generation and Detection

**Course Project | Deep Learning | College of Artificial Intelligence**

A deep learning project focused on detecting real versus AI-manipulated facial images and generating synthetic faces to stress-test deepfake detectors.

The project explores how deep learning models distinguish authentic facial images from manipulated or AI-generated content. Alongside detection, we incorporate Stable Diffusion-generated fake images to investigate how detectors respond to newer synthesis techniques.

---

## 📌 Project Overview

### Problem Statement

Deepfake generation techniques are evolving rapidly. Detectors trained on one manipulation method may fail when evaluated on images produced by a different method or generation pipeline.

This project aims to:

- Build a detector that classifies facial images as **Real** or **Fake**.
- Evaluate detection performance on deepfake datasets.
- Explore generalization across datasets and synthesis methods.
- Generate a small set of synthetic faces using Stable Diffusion.
- Analyze examples that fool the detector.

### Project Objectives

- Deepfake detection using CNN-based architectures.
- Explore Vision Transformer (ViT)-based detection.
- Evaluate models on different deepfake datasets.
- Study cross-dataset generalization.
- Generate synthetic fake images for detector stress-testing.
- Analyze false positives and false negatives.

---

## 🗂️ Datasets

The project description identifies the following datasets:

| Dataset | Description | Purpose |
|---|---|---|
| FaceForensics++ | Real and manipulated facial videos/images | Training and evaluation |
| Celeb-DF v2 | High-quality deepfake videos | Cross-dataset evaluation |
| DFDC Sample Set | Deepfake Detection Challenge sample data | Additional evaluation |
| Stable Diffusion Images | AI-generated facial images | Detector stress-testing |

### Stable Diffusion Dataset

We incorporate Stable Diffusion generation code and prompts from:

## 📥 Dataset Access

The dataset used for this project can be accessed through the following Google Drive link:

🔗 **[Download Dataset from Google Drive](https://drive.google.com/drive/folders/10-n9jY3USb5O_2bh4yUpo1IRPWxe1RIA?usp=drive_link)**

Please ensure that the dataset is downloaded and organized according to the expected directory structure before running training or evaluation scripts.

> Note: Dataset access may require Google account authentication. Please follow the original dataset licenses and usage restrictions.

The downloaded test split images are stored locally under:

```text
datasets/stable_diffusion/fake/
```

These images are intended to provide an additional fake-image domain for testing detector robustness.

**Note:** The currently integrated Stable Diffusion images represent the downloaded test split, not the complete original dataset.

### Dataset Preparation

The detector's training and evaluation pipeline uses JSON manifests containing image paths and labels.

Labels:

- `0` — Real
- `1` — Fake

Dataset images must be included in the appropriate manifests before they can be used for training or evaluation.

Datasets are kept separate from the GitHub repository due to their size and possible redistribution restrictions.

---

## 🧠 Deepfake Generation

The project incorporates Stable Diffusion generation code from:

[RealFaces_w_StableDiffusion](https://github.com/LucaCorvitto/RealFaces_w_StableDiffusion)

The generation pipeline uses:

- `main.py` — Stable Diffusion image generation
- `prompts.txt` — Text prompts for generating synthetic faces

The generation script uses Hugging Face Diffusers to generate AI-created facial images.

Generated images can be used to evaluate how well the detector identifies synthetic faces.

**Requirements:**
- Python
- Hugging Face Diffusers
- Compatible PyTorch installation
- GPU recommended for image generation

The generation pipeline is separate from the detector training and evaluation pipeline.

---

## 🔍 Deepfake Detection Pipeline

The detection workflow consists of the following stages:

1. Dataset collection and preparation
2. Face image preprocessing
3. JSON manifest generation
4. Model training
5. Model validation
6. Evaluation on held-out test data
7. Cross-dataset evaluation
8. Error analysis

### Detection Classes

| Class | Label |
|---|---|
| Real | 0 |
| Fake | 1 |

---

## 🏗️ Model Architectures

The repository contains deep learning models for binary real/fake classification.

The project explores compact CNN architectures and larger pretrained models, depending on the available implementation and configuration.

Potential model comparisons include:

- MesoNet
- MesoInception
- MesoInception with CBAM attention
- Xception
- Vision Transformer (ViT-B/16)

CNN-based architectures are useful for detecting spatial artifacts, while transformer-based models can explore broader image representations.

Only models that have actually been trained and evaluated should be reported as completed experiments.

---

## ⚙️ Technology Stack

- **Python**
- **PyTorch**
- **OpenCV**
- **CNNs**
- **Vision Transformers**
- **Hugging Face Diffusers**
- **Stable Diffusion**
- **NumPy**
- **Scikit-learn**
- **Matplotlib**

---

## 📁 Repository Structure

```text
deepfake-detection-CNN/
│
├── main.py
├── prompts.txt
├── requirements.txt
├── README.md
│
├── src/
│   ├── train.py
│   ├── eval.py
│   └── models/
│
├── datasets/
│   └── stable_diffusion/
│       └── fake/
│
├── docs/
├── figures/
├── paper/
└── results/
```

*The structure shown above is illustrative and may vary based on the actual repository contents.*

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/Bhivanshu45/Deepfake_Detector_CNN.git
cd Deepfake_Detector_CNN
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

Activate it on Linux/macOS:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 🏋️ Training

The training script uses JSON manifests containing image paths and labels.

Example command:

```bash
python src/train.py \
  --train_manifest manifests/train.json \
  --val_manifest manifests/val.json \
  --model mesoinception4_cbam \
  --epochs 50 \
  --batch_size 32 \
  --output_dir checkpoints/deepfake_detector
```

Check the actual supported arguments before running:

```bash
python src/train.py --help
```

---

## 📊 Evaluation

Example evaluation command:

```bash
python src/eval.py \
  --manifest manifests/test.json \
  --checkpoint checkpoints/deepfake_detector/best_model.pth \
  --model_arch mesoinception4_cbam \
  --output_dir evaluation_results/test
```

Check the supported arguments:

```bash
python src/eval.py --help
```

### Evaluation Metrics

The project aims to report:

| Metric | Description |
|---|---|
| Accuracy | Overall classification correctness |
| Precision | Correct fake predictions among predicted fakes |
| Recall | Proportion of fake images correctly detected |
| F1-Score | Harmonic mean of precision and recall |
| ROC-AUC | Ability to distinguish real and fake across thresholds |
| Confusion Matrix | Summary of correct and incorrect predictions |

---

## 🌐 Cross-Dataset Generalization

An important objective is to investigate whether a detector trained on one dataset can generalize to another dataset or generation method.

Examples include:

- Training on FaceForensics++ and testing on Celeb-DF v2.
- Evaluating on DFDC sample data.
- Testing the detector on Stable Diffusion-generated images.

Cross-dataset testing helps identify whether a model learns general forgery characteristics or dataset-specific artifacts.

---

## 🔬 Error Analysis

The final analysis will investigate:

- Which manipulation methods are easiest to detect.
- Which fake images are misclassified as real.
- Which real images are incorrectly classified as fake.
- Whether detector performance drops on unseen datasets.
- Whether Stable Diffusion images expose weaknesses in CNN-based detectors.
- Whether models rely on dataset-specific visual patterns.

---

## 🎯 Expected Deliverables

- Deepfake detection model.
- Real/fake image classification pipeline.
- Evaluation using relevant metrics.
- Cross-dataset generalization analysis.
- Small team-generated fake-image dataset.
- Analysis of examples that fool the detector.

**Experimental results and performance metrics will be added after the corresponding training and evaluation experiments are completed.**

---

## ⚠️ Limitations

- Deepfake detectors may fail on unseen generation techniques.
- Dataset-specific artifacts can affect model performance.
- Results depend on dataset quality, preprocessing, and split construction.
- Stable Diffusion-generated images may differ from video-derived images in ways unrelated to manipulation.
- Predictions should not be treated as definitive proof that an image is authentic or fake.

---

## 📜 Attribution

This project incorporates code, prompts, and/or dataset material from:

- [RealFaces_w_StableDiffusion](https://github.com/LucaCorvitto/RealFaces_w_StableDiffusion)

Please refer to the original repository for author attribution and licensing requirements.

Datasets and model architectures used in the final report should also be cited according to their original publications and terms of use.

---

## 📚 References

- [FaceForensics++](https://github.com/ondyari/FaceForensics)
- [Celeb-DF](https://github.com/yuezunli/Celeb-DF)
- [RealFaces_w_StableDiffusion](https://github.com/LucaCorvitto/RealFaces_w_StableDiffusion)
- [PyTorch](https://pytorch.org/)
- [Hugging Face Diffusers](https://github.com/huggingface/diffusers)

---

**Project Title:** Deepfake Generation and Detection  
**Focus:** CNN/ViT-based detection, synthetic fake generation, and cross-dataset generalization.
