import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchModels,
  fetchModelDetails,
  setModel1Data,
  setModel2Data,
} from "./modelSlice";
import { Select, Title, Grid, Paper, Table } from "@mantine/core";

export default function ComparePage() {
  const dispatch = useDispatch();
  const { modelList, model1Data, model2Data } = useSelector(
    (state) => state.models
  );

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  const handleSelect = (modelName, modelNumber) => {
    dispatch(fetchModelDetails(modelName)).then((res) => {
      if (modelNumber === 1) dispatch(setModel1Data(res.payload));
      else dispatch(setModel2Data(res.payload));
    });
  };

  const renderModel = (model) =>
    model && (
      <Paper shadow="md" p="md" mt="md">
        <h3>{model.model_name}</h3>
        <Table>
          <tbody>
            <tr>
              <td>Accuracy</td>
              <td>{model.accuracy}</td>
            </tr>
            <tr>
              <td>Train</td>
              <td>{model.train_cases}</td>
            </tr>
            <tr>
              <td>Test</td>
              <td>{model.test_cases}</td>
            </tr>
            <tr>
              <td>Matrix</td>
              <td>{JSON.stringify(model.confusion_matrix)}</td>
            </tr>
          </tbody>
        </Table>
      </Paper>
    );

  return (
    <div style={{ padding: "2rem" }}>
      <Title>Compare CNN Models</Title>
      <Grid mt="md">
        <Grid.Col span={6}>
          <Select
            label="Select Model 1"
            data={modelList.map((m) => m.model_name)}
            onChange={(val) => handleSelect(val, 1)}
          />
          {renderModel(model1Data)}
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Select Model 2"
            data={modelList.map((m) => m.model_name)}
            onChange={(val) => handleSelect(val, 2)}
          />
          {renderModel(model2Data)}
        </Grid.Col>
      </Grid>
    </div>
  );
}
