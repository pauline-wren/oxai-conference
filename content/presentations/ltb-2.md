---
id: "ltb-2"
session_id: "session-ltb"
presenter: "Francesco Innocenti"
affiliation: ""
title: "Why the Brain is Wide, not Deep: Implementing Backpropagation with a Local Algorithm"
---

Backpropagation (BP) is the standard algorithm for training
artificial neural networks. However, BP is energy inefficient and unlikely to be
implemented by the brain. Predictive coding (PC) is an influential theory of
information processing in the brain that has recently been developed into a
“biologically plausible” alternative to BP. Unlike BP, weight updates computed
by PC require information only from neighbouring neurons. In this talk, I show
that, under stable and feature-learning (“non-lazy”) parameterisations, networks
trained with PC effectively implement BP when the number of hidden neurons
(width) is much larger than the number of layers (depth).
