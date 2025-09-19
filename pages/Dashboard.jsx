import { bookService } from "../services/book.service.js";
const { useEffect, useState } = React;

export function Dashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const books = await bookService.query();
      booksCategoriesStats(books)
    } catch (err) {
      console.log("🚀 ~ booksCategoriesStats ~ err:", err);
      return err;
    }
  }

  function booksCategoriesStats(books) {
    const categoriesStat = books.reduce(
      (accumulator, book) => {
        book.categories.forEach(category=>{
            accumulator.counter++;
            if (accumulator[category]) {
                accumulator[category]++;
            }else {
                accumulator[category]= 1 
            }
        })
        return accumulator;
      },
      { counter:0 }
    );
    return calculatePresentage(categoriesStat);
  }

  function calculatePresentage(itemsObj) {
    const total = itemsObj.counter;
    let newObj = {};
    for (let key in itemsObj) {
      if (key !== "counter") {
        let newValue = (itemsObj[key] / total) * 100;
        newObj = { ...newObj, [key]: newValue };
      }
    }
    setStats(newObj)
  }

  if (!stats) return <div>Loading...</div>;
  return (
    <section className="dashboard-container">
      {Object.keys(stats).map((key) => {
        const decimalNumber = Number.isInteger(stats[key]) ?  stats[key] +'%' : stats[key].toFixed(2) + '%' ;
        console.log(Number.isInteger(stats[key]), stats[key]);
        
        const heightStyle = { height: Number((stats[key] / 100 * 70)) + 'vh' };
        return (
          <div className="chart-container" key={key}>
            <div className="chart" style={heightStyle}><span className="label-present">{decimalNumber}</span></div>
            <p className="label-present">{key}</p>
          </div>
        );
      })}
    </section>
  );
}
