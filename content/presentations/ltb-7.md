---
id: "ltb-6"
session_id: "session-ltb"
presenter: "Ivan Parfilov"
affiliation: "Senior Technical Product Manager at YTsaurus and MSc Software Engineering student."
title: "Data Processing, Model Training, and Batch Inference on YTsaurus, an Open-Source Exabyte-Scale Platform"
---

As AI models scale, infrastructure often becomes the primary bottleneck. This presentation
introduces YTsaurus, an open-source exabyte-scale big data platform, demonstrating how it
serves as a unified foundation for the entire Machine Learning lifecycle. The talk will explore
how YTsaurus seamlessly integrates data engineering with ML workloads, focusing on three
core pillars: 1) Data processing at scale without data movement, 2) Distributed model
training via large-scale GPU orchestration and topology-aware scheduling, and 3) Batch
inference natively on data clusters.

**Outline / Key Points:**
* **Introduction:** The infrastructure bottleneck in modern AI and a brief
introduction to YTsaurus (open-source, exabyte-scale capabilities).
* **Pillar 1: Data Processing:** Building unified pipelines using built-in MapReduce,
SPYT (Apache Spark), and CHYT (ClickHouse).
* **Pillar 2: Distributed Model Training:** GPU orchestration, solving hardware
fragmentation for large-scale training.
* **Pillar 3: Batch Inference** Executing models directly over massive datasets
using declarative YQL and Python UDFs within isolated Docker containers.
* **Conclusion:** The benefits of building scalable, end-to-end ML pipelines in a
single ecosystem.

