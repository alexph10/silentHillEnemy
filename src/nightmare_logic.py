import random

# Define rules for nightmare logic generation
nightmare_rules = {
    "Guilt": ["Appears in mirrors", "Follows player in fog", "Cannot be killed permanently"],
    "Sexual Trauma": ["Uncanny humanoid shapes", "Distorted breathing sounds", "Reacts to player movement"],
    "Paranoia & Fear": ["Random spawn locations", "Disappears when looked at", "Whispering voices"],
    "Religious Symbolism": ["Chants or prayers", "Appears in sanctified areas", "Evolves over time"],
    "Childhood Trauma": ["Toys or dolls", "Laughter in distance", "Crawling movement"]
}

def generate_nightmare_scenario(theme):
    if theme in nightmare_rules:
        return random.choice(nightmare_rules[theme])
    return "No nightmare logic available."

if __name__ == "__main__":
    test_theme = "Paranoia & Fear"
    print(f"Nightmare Logic for {test_theme}: {generate_nightmare_scenario(test_theme)}")



