var html_insert_blog = `<ul class="nav-detail-content">
                                <li><a href="https://medium.com/@blackhole.large/bitcoin-là-gì-1d4cea7b1a3a">What is Bitcoin?</a></li>
                                
                                <li><a href="https://medium.com/@blackhole.large/multimodal-deep-learning-bridging-senses-for-smarter-ai-554115fab1b1">Multimodal Deep Learning: Core Challenges
</a></li>
                                
                                <li><a href="https://medium.com/@blackhole.large/mining-of-massive-datasets-part-1-92adb675a9f6">Mining of Massive Datasets [part 1]
</a></li>
                                
                                <li><a href="https://medium.com/@blackhole.large/self-supervised-learning-overview-80e0fcc5a335">Self-Supervised Learning Overview</a></li>
                                
                                <li><a href="https://medium.com/@blackhole.large/pytorch-advanced-tutorial-vectorization-convolution-and-data-handling-0e55c24f08dc">PyTorch Advanced Tutorial: Vectorization, Convolution, and Data Handling
</a></li>
                                <li><a href="https://medium.com/@blackhole.large/paper-review-itransformer-inverted-transformers-are-effective-for-time-series-forecasting-37d8639bf276">[Paper Review] iTransformer Inverted Transformers Are Effective for Time Series Forecasting
</a></li>
                                <li><a href="https://medium.com/@blackhole.large/patchtst-revolutionizing-long-term-forecasting-with-patching-and-channel-independence-in-fa1d1986bfc2">[Paper Review] PatchTST: Revolutionizing Long-Term Forecasting with Patching and Channel Independence in Transformers
</a></li>
                                <li><a href="https://medium.com/@blackhole.large/7-essential-pytorch-tips-to-supercharge-your-deep-learning-projects-2b826bd6587f">7 Essential PyTorch Tips to Supercharge Your Deep Learning Projects
</a></li>

<li><a href="https://www.linkedin.com/pulse/apache-kafka-distributed-systems-brief-hands-on-tutorial-anh-l%C3%AA-zl3ic">Apache Kafka for Distributed Systems: A Brief Hands-On Tutorial
</a></li>


                            </ul>`;
var html_insert_book = `<ul class="nav-detail-content">
                                <li><a href="https://synapsespectrum.github.io/probabilityForComputerScientists/en/index.html">Probability for Computer scientists - <i>Chris Piech</i></a></li>
                                <li><a href="https://andrewlee1807.github.io/books/Cheat Sheets for AI.pdf">Cheat Sheets for AI - <i>BecommingHuman.AI</i></a></li>
                                <li><a href="https://andrewlee1807.github.io/books/Sách Deep Learning cơ bản.pdf">Deep learning (vi) - <i>Tran Thanh Tuan</i> </a></li>
                                <li><a href="https://andrewlee1807.github.io/books/Survey of Neural Transfer Functions.pdf">Survey of Neural Transfer Functions - <i>Włodzisław Duch & Norbert Jankowski</i> </a></li>

                            </ul>`;
var html_insert_project = `<ul class="nav-detail-content">
                                <li><a href="https://us.softbankrobotics.com/pepper">Robot Pepper (Softbank) </a></li>
                                <li><a href="https://www.intel.com/content/www/us/en/developer/articles/technical/intel-neural-compute-stick-2-intel-ncs-2-and-16-floating-point-fp16.html">Intel® Neural Compute Stick</a></li>
                                <li><a href="https://github.com/KC-Pipeline/Dev">Automated Machine Learning for Energy consumption prediction</a></li>
                                <li><a href="https://github.com/AISeedHub/">Smartfarm (Streaming data)</a></li>
                                <li><a href="https://andrewlee1807.github.io/scholar/">Visualizing citation paper from research paper data (Google Scholar)
</a></li>
                                <li><a href="#">AI Agent Fetching Paper (working on)</a></li>

                            </ul>`;

var html_insert_home = `
    <header><h1>Hi, I am Andrew</h1></header>
    <p>Welcome to my personal site! A passionate researcher exploring the frontiers of AI.</p>
    <p class="mb-5">PhD student specializing in Time Series Forecasting and Machine Learning Ops. Bridging advanced neural networks with real-world challenges.</p>
    <p>Transforming complex data into intelligent insights.</p>
    <p>Check in <i class="fa fa-hand-o-down" style="font-size:24px"></i></p>
    <div class="tm-social-icons-container text-xs-center">
        <a href="https://github.com/andrewlee1807" class="tm-social-link"><i class="fa fa-github"></i></a>
        <a href="#" class="tm-social-link"><i class="fa fa-facebook"></i></a>
        <a href="https://www.instagram.com/blackhole.large/" class="tm-social-link"><i class="fa fa-instagram"></i></a>
        <a href="https://www.flickr.com/photos/192362930@N04/albums" class="tm-social-link"><i class="fa fa-flickr"></i></a>
        <a href="https://www.linkedin.com/in/anh-l%C3%AA-93b46b189/" class="tm-social-link"><i class="fa fa-linkedin"></i></a>
    </div>
`;
function home() {
    document.getElementById("Content_Nav").innerHTML = html_insert_home;
}

// Automatically load home content when page loads
document.addEventListener('DOMContentLoaded', home);


function blog() {
    document.getElementById("Content_Nav").innerHTML = html_insert_blog;
}

function book() {
    document.getElementById("Content_Nav").innerHTML = html_insert_book;
}

function project() {
    document.getElementById("Content_Nav").innerHTML = html_insert_project;
}
