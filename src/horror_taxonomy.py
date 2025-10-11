import networkx as nx
import matplotlib.pyplot as plt

horror_archetypes = {
    "Guilt": ["Pyramid Head", "Abstract Daddy"],
    "Sexual Trauma": ["Bubble Head Nurse", "Flesh Lips"],
    "Paranoia & Fear of the Unknown": ["Lying Figure", "Twin Victim"],
    "Religious Symbolism": ["Valtiel", "Missionary"],
    "Childhood Trauma": ["Robbie the Rabbit", "Memory of Alessa"]
}

def print_archetypes():
    print("Silent Hill Psychological Horror Archetypes:\n")
    for theme, monsters in horror_archetypes.items():
        print(f"{theme}: {', '.join(monsters)}")

if __name__ == "__main__":
    print_archetypes()

def create_horror_graph(df):
    G = nx.Graph()

    # Add nodes (themes & monsters)
    for _, row in df.iterrows():
        theme = row["theme"]
        enemy = row["enemy"]
        G.add_node(theme, type="theme")
        G.add_node(enemy, type="enemy")
        G.add_edge(theme, enemy)

    return G

def draw_graph(G):
    plt.figure(figsize=(10, 6))
    pos = nx.spring_layout(G, seed=42)
    node_colors = ["red" if G.nodes[n]["type"] == "theme" else "black" for n in G.nodes]

    nx.draw(G, pos, with_labels=True, node_color=node_colors, edge_color="gray", font_size=10, font_weight="bold")
    plt.show()

if __name__ == "__main__":
    df = pd.read_csv("database/horror_taxonomy.csv")
    G = create_horror_graph(df)
    draw_graph(G)
