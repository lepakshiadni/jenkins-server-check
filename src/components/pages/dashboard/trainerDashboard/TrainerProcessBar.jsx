

const SlideData = () => {

    const trainingData = [
      {role: 'UI Developer', topics: 'Java, Python, C++, C sharp' },
      {role: 'UI Developer', topics: 'Java, Python, C++, C sharp' },
      {role: 'UI Developer', topics: 'Java, Python, C++, C sharp' },
      {role: 'UI Developer', topics: 'Java, Python, C++, C sharp' },
      {role: 'UI Developer', topics: 'Java, Python, C++, C sharp' },
      {role: 'UI Developer', topics: 'Java, Python, C++, C sharp' },
      {role: 'UI Developer', topics: 'Java, Python, C++, C sharp' },
  
    ];
  
    return (
      <div id="carouselExampleIndicators" className="m-5 carousel slide " style={{ height: '797px', width: '257px', border: '1px solid #DEDEDE', }}>
        <div className="carousel-inner">
  
          <div className="carousel-item active">
            <div className="flex items-center justify-evenly" style={{ backgroundColor: "#2676C2", height: "41px", fontSize: '14px', fontWeight: 500 }}>
              <span data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
                  <path d="M12.3131 5.65565L0.999395 5.65565M0.999395 5.65565L5.24204 9.89829M0.999395 5.65565L5.24204 1.41301" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <h3 style={{ color: "#FFFFFF", }}>Completed Trainings</h3>
              <h3 className="flex items-center justify-center" style={{ height: '26px', width: '26px', color: '#2676C2', backgroundColor: "#FFFFFF", borderRadius: '50%', }}>{trainingData.length}</h3>
              <span data-bs-target="#carouselExampleIndicators" data-bs-slide="next" className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
                  <path d="M0.999396 5.65685H12.3131M12.3131 5.65685L8.07046 1.41421M12.3131 5.65685L8.07046 9.89949" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <div className="slideDataScroll">
              {trainingData.map((training, index) => (
                <div className="flex items-center" style={{ height: '121px', width: '237px', fontWeight: 400, backgroundColor: "rgba(38, 118, 194, 0.2)", borderRadius: '4px', marginLeft: '10px', marginTop: '20px', overflow: 'hidden' }}>
                  <div style={{ width: "5px", height: "121px", backgroundColor: "#2676C2" }}></div>
                  <div style={{ marginLeft: '20px' }}>
                    <h3 style={{ color: '#333333', fontSize: '14px' }}>Name of training</h3>
                    <h3 className="mb-2" style={{ color: '#2676C2', fontSize: '12px' }}>{training.role}</h3>
                    <h3 style={{ color: '#333333', fontSize: '14px' }}>Topics & Trainings</h3>
                    <h3 style={{ color: '#2676C2', fontSize: '12px' }}>{training.topics}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="carousel-item ">
            <div className="flex items-center justify-evenly" style={{ backgroundColor: "#2676C2", height: "41px", fontSize: '14px', fontWeight: 500 }}>
              <span data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
                  <path d="M12.3131 5.65565L0.999395 5.65565M0.999395 5.65565L5.24204 9.89829M0.999395 5.65565L5.24204 1.41301" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <h3 style={{ color: "#FFFFFF", }}>Upcoming Trainings</h3>
              <h3 className="flex items-center justify-center" style={{ height: '26px', width: '26px', color: '#2676C2', backgroundColor: "#FFFFFF", borderRadius: '50%', }}>{trainingData.length}</h3>
              <span data-bs-target="#carouselExampleIndicators" data-bs-slide="next" className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
                  <path d="M0.999396 5.65685H12.3131M12.3131 5.65685L8.07046 1.41421M12.3131 5.65685L8.07046 9.89949" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <div className="slideDataScroll">
              {trainingData.map((training, index) => (
                <div className="flex items-center" style={{ height: '121px', width: '237px', fontWeight: 400, backgroundColor: "rgba(38, 118, 194, 0.2)", borderRadius: '4px', marginLeft: '10px', marginTop: '20px', overflow: 'hidden' }}>
                  <div style={{ width: "5px", height: "121px", backgroundColor: "#2676C2" }}></div>
                  <div style={{ marginLeft: '20px' }}>
                    <h3 style={{ color: '#333333', fontSize: '14px' }}>Name of training</h3>
                    <h3 className="mb-2" style={{ color: '#2676C2', fontSize: '12px' }}>{training.role}</h3>
                    <h3 style={{ color: '#333333', fontSize: '14px' }}>Topics & Trainings</h3>
                    <h3 style={{ color: '#2676C2', fontSize: '12px' }}>{training.topics}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-item ">
            <div className="flex items-center justify-evenly" style={{ backgroundColor: "#2676C2", height: "41px", fontSize: '14px', fontWeight: 500 }}>
              <span data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
                  <path d="M12.3131 5.65565L0.999395 5.65565M0.999395 5.65565L5.24204 9.89829M0.999395 5.65565L5.24204 1.41301" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <h3 style={{ color: "#FFFFFF", }}>Ongoing Training</h3>
              <h3 className="flex items-center justify-center" style={{ height: '26px', width: '26px', color: '#2676C2', backgroundColor: "#FFFFFF", borderRadius: '50%', }}>{trainingData.length}</h3>
              <span data-bs-target="#carouselExampleIndicators" data-bs-slide="next" className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
                  <path d="M0.999396 5.65685H12.3131M12.3131 5.65685L8.07046 1.41421M12.3131 5.65685L8.07046 9.89949" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <div className="slideDataScroll">
              {trainingData.map((training, index) => (
                <div className="flex items-center" style={{ height: '121px', width: '237px', fontWeight: 400, backgroundColor: "rgba(38, 118, 194, 0.2)", borderRadius: '4px', marginLeft: '10px', marginTop: '20px', overflow: 'hidden' }}>
                  <div style={{ width: "5px", height: "121px", backgroundColor: "#2676C2" }}></div>
                  <div style={{ marginLeft: '20px' }}>
                    <h3 style={{ color: '#333333', fontSize: '14px' }}>Name of training</h3>
                    <h3 className="mb-2" style={{ color: '#2676C2', fontSize: '12px' }}>{training.role}</h3>
                    <h3 style={{ color: '#333333', fontSize: '14px' }}>Topics & Trainings</h3>
                    <h3 style={{ color: '#2676C2', fontSize: '12px' }}>{training.topics}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="flex items-center justify-evenly " style={{ backgroundColor: "#C22626", height: "41px", fontWeight: 500, fontSize: '14px' }}>
              <span data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
                  <path d="M12.3131 5.65565L0.999395 5.65565M0.999395 5.65565L5.24204 9.89829M0.999395 5.65565L5.24204 1.41301" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <h3 style={{ color: "#FFFFFF", }}>Denied Training</h3>
              <h3 className="flex items-center justify-center" style={{ height: '26px', width: '26px', color: '#C22626', backgroundColor: "#FFFFFF", borderRadius: '50%', }}>{trainingData.length}</h3>
              <span data-bs-target="#carouselExampleIndicators" data-bs-slide="next" className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
                  <path d="M0.999396 5.65685H12.3131M12.3131 5.65685L8.07046 1.41421M12.3131 5.65685L8.07046 9.89949" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <div className="slideDataScroll">
              {trainingData.map((training, index) => (
                <div key={index} className="flex items-center" style={{ height: '121px', width: '237px', backgroundColor: "rgba(194,38,38, 0.2)", borderRadius: '4px', marginLeft: '10px', marginTop: '20px', overflow: 'hidden', fontWeight: 400 }}>
                  <div style={{ width: "5px", height: "121px", backgroundColor: "#C22626" }}></div>
                  <div style={{ marginLeft: '20px' }}>
                    <h3 style={{ color: '#333333', fontSize: '14px' }}>Name of training</h3>
                    <h3 className="mb-2" style={{ color: '#C22626', fontSize: '12px' }}>{training.role}</h3>
                    <h3 style={{ color: '#333333', fontSize: '14px' }}>Topics & Trainings</h3>
                    <h3 style={{ color: '#C22626', fontSize: '12px' }}>{training.topics}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div >
    );
  };
  
  export default SlideData;
  