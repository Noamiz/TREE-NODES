import { TreeDefinition } from "../components/tree";

const tree: TreeDefinition[] = [
  { id: "cat1", displayName: "cat1", children: [] },
  { id: "cat2", displayName: "cat2", children: [] },
  {
    id: "cat3",
    displayName: "cat3",
    children: [
      {
        id: "cat3-1",
        displayName: "cat3-1",
        children: [
          {
            id: "cat3-1-1",
            displayName: "cat3-1-1",
            children: [
              {
                id: "cat3-1-1-1",
                displayName: "cat3-1-1-1",
                children: [
                  {
                    id: "cat3-1-1-1-1",
                    displayName: "cat3-1-1-1-1",
                    children: [
                      {
                        id: "cat3-1-1-1-1-1",
                        displayName: "cat3-1-1-1-1-1",
                        children: [],
                      },
                    ],
                  },
                  {
                    id: "cat3-1-1-1-2",
                    displayName: "cat3-1-1-1-2",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      { id: "cat3-2", displayName: "cat3-2", children: [] },
    ],
  },
];

export default tree;
