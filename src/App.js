import React, { useEffect, useState } from 'react';
import useFetch from './hooks/use-fetch';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
      setTasks(loadedTasks);
  };

  const httpData = useFetch(transformTasks);
    
  console.error("httpData",httpData)
  const {isLoading,error,sendRequest: fetchTasks } = httpData;
    // const abc =   useFetch(
    //   {url:'https://react-tasks-ee846-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
    //   },transformTasks);

    console.log(typeof fetchTasks,"fetchTasks ??????");
    console.warn(isLoading,"isLoading ??????",error,"error ??????");
    // console,error("abc",abc)


  // const fetchTasks = async (taskText) => {
    // setIsLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(
    //     'https://react-tasks-ee846-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
    //   );

    //   if (!response.ok) {
    //     throw new Error('Request failed!');
    //   }

    //   const data = await response.json();

    //   const loadedTasks = [];

    //   for (const taskKey in data) {
    //     loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    //   }

    //   setTasks(loadedTasks);
    // } catch (err) {
    //   setError(err.message || 'Something went wrong!');
    // }
    // setIsLoading(false);
  // };

  useEffect(() => {
    fetchTasks({url:'https://react-tasks-ee846-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'},transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
