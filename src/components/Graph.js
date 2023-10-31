import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Graph = ({ data }) => {
  const soyabinChartRef = useRef(null);
  // const [soyabinChart, setSoyabinChart] = useState(null);
  const chanaChartRef = useRef(null);
  // const [chanaChart, setChanaChart] = useState(null);


  useEffect(() => {
    // Soyabin chart 
    const soyabinYears = [];
    const soyabinCosts = [];


    data?.prodWorkData?.forEach((item) => {
      if (item?.fields?.crop_name === 'Soyabin') {
        const year = item?.fields?.added_at ? new Date(item?.fields?.added_at).getFullYear() : null;
        const cost = parseFloat(item?.fields?.crop_amount) ?? 0;

        if (year && cost) {
          soyabinYears.push(year);
          soyabinCosts.push(cost);
        }
      }
    });


    // if (soyabinChart) {
    //   soyabinChart.destroy();
    // }

    const soyabinCtx = soyabinChartRef.current.getContext('2d');
    const newSoyabinChart = new Chart(soyabinCtx, {
      type: 'line',
      data: {
        labels: soyabinYears,
        datasets: [
          {
            label: 'Profit (in Thousands)',
            animation: {
              duration: 2000,
              easing: 'easeInOutQuart',
            },
            data: soyabinCosts,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: { 
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'सोयाबीन उत्पादन',
            position: 'top',
            align: 'start',
            color: '#2192FF',
            padding: {
              top: 2,
              bottom: 0,
            },
            font: {
              size: 13,
            },
          },
          scales: {
            x: {
              title: {
                display: true, 
                color: '#2192FF', // Customize the x-axis label color here
                font: {
                  size: 10, // Adjust the font size as needed
                  weight: 'bold', // Specify the font weight
                },
              },
            },
            y: {
              title: {
                display: true, 
                color: '#2192FF', // Customize the y-axis label color here
                font: {
                  size: 10, // Adjust the font size as needed
                  weight: 'bold', // Specify the font weight
                },
              },
            },
          },
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            enabled: true,
            mode: 'x',
          },
          animations: {
            radius: {
              duration: 400,
              easing: 'linear',
              loop: (context) => context.active
            }
          },
        },
      },
    });

    return () => {
      newSoyabinChart.destroy();
    };
    
    // setSoyabinChart(newSoyabinChart);

 
  }, [data?.prodWorkData]);


  useEffect(() => {
    // Chana chart
    const chanaYears = [];
    const chanaCosts = [];

    data?.prodWorkData?.forEach((item) => {
      if (item?.fields?.crop_name === 'Chana') {
        const year = item?.fields?.added_at ? new Date(item?.fields?.added_at).getFullYear() : null;
        const cost = parseFloat(item?.fields?.crop_amount) ?? 0;

        if (year && cost) {
          chanaYears.push(year);
          chanaCosts.push(cost);
        }
      }
    });

    // if (chanaChart) {
    //   chanaChart.destroy();
    // }

    const chanaCtx = chanaChartRef.current.getContext('2d');
    const newChanaChart = new Chart(chanaCtx, {
      type: 'line',
      data: {
        labels: chanaYears,
        datasets: [
          {
            label: ' Profit (in Thousands)',
            animation: {
              duration: 2000,
              easing: 'easeInOutQuart',
            },
            data: chanaCosts,
            backgroundColor: '#F8E8EE',
            borderColor: '#F31559',
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'हरभरा उत्पादन',
            position: 'top',
            align: 'start',
            color: '#F31559',
            padding: {
              top: 0,
              bottom: 0,
            },
            font: {
              size: 13,
            },
          },
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            enabled: true,
            mode: 'x',
          },
        },
      },
    });


    return () => {
      newChanaChart.destroy();
    };

    // setChanaChart(newChanaChart);

  }, [data.prodWorkData]);



  return (
    <div className="space-y-4">
      <div className='p-3 backdrop-filter rounded-2xl backdrop-blur-2xl bg-white bg-opacity-5'>
        <canvas id="soyabinChart" ref={soyabinChartRef} height={250} />
      </div>

      {/* <hr className=' bg-gray-500' /> */}
      
      <div className='p-3 backdrop-filter rounded-2xl backdrop-blur-2xl bg-white bg-opacity-5'>
        <canvas id="chanaChart" ref={chanaChartRef} height={250} />
      </div>
    </div>
  );
};

export default Graph;
