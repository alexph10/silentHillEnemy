# Import SQLAlchemy libraries and create a declarative base
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from deap import base, creator, tools

# Define the base class for model declarations
Base = declarative_base()

# Model for the 'enemies' table
class Enemy(Base):
    __tablename__ = 'enemies'
    enemy_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    game_appearance = Column(String(50))
    psychological_symbolism = Column(Text)
    otherworld_behavior = Column(Text)
    image_url = Column(String(255))
    video_url = Column(String(255))
    
    # Define relationships to other tables
    physical_attributes = relationship("PhysicalAttribute", back_populates="enemy")
    movement = relationship("Movement", back_populates="enemy")
    vulnerabilities = relationship("Vulnerability", back_populates="enemy")
    attack_patterns = relationship("AttackPattern", back_populates="enemy")
    audio_cues = relationship("AudioCue", back_populates="enemy")
    visualizations = relationship("Visualization", back_populates="enemy")

# Model for physical attributes
class PhysicalAttribute(Base):
    __tablename__ = 'physical_attributes'
    attr_id = Column(Integer, primary_key=True)
    enemy_id = Column(Integer, ForeignKey('enemies.enemy_id'))
    body_type = Column(String(255))
    size = Column(String(100))
    notable_features = Column(Text)
    
    enemy = relationship("Enemy", back_populates="physical_attributes")

# Model for movement data
class Movement(Base):
    __tablename__ = 'movement'
    move_id = Column(Integer, primary_key=True)
    enemy_id = Column(Integer, ForeignKey('enemies.enemy_id'))
    movement_type = Column(String(255))
    speed_level = Column(String(100))
    behavior_pattern = Column(Text)
    
    enemy = relationship("Enemy", back_populates="movement")

# Model for vulnerabilities
class Vulnerability(Base):
    __tablename__ = 'vulnerabilities'
    vuln_id = Column(Integer, primary_key=True)
    enemy_id = Column(Integer, ForeignKey('enemies.enemy_id'))
    weak_to = Column(String(255))
    resistant_to = Column(String(255))
    immune_to = Column(String(255))
    
    enemy = relationship("Enemy", back_populates="vulnerabilities")

# Model for attack patterns
class AttackPattern(Base):
    __tablename__ = 'attack_patterns'
    attack_id = Column(Integer, primary_key=True)
    enemy_id = Column(Integer, ForeignKey('enemies.enemy_id'))
    attack_name = Column(String(255))
    damage_output = Column(Integer)
    attack_range = Column(String(50))
    attack_speed = Column(String(50))
    
    enemy = relationship("Enemy", back_populates="attack_patterns")

# Model for audio cues
class AudioCue(Base):
    __tablename__ = 'audio_cues'
    audio_id = Column(Integer, primary_key=True)
    enemy_id = Column(Integer, ForeignKey('enemies.enemy_id'))
    sound_type = Column(String(255))
    description = Column(Text)
    
    enemy = relationship("Enemy", back_populates="audio_cues")


# Replace 'username', 'password', 'localhost', and 'silent_hill_enemies' with your actual values

DATABASE_URL_1 = "mysql+pymysql://username:password@localhost/silent_hill_enemies"
DATABASE_URL_2 = "mysql+pymysql://username:password@localhost/silent_hill_2_enemies"
DATABASE_URL_3 = "mysql+pymysql://username:password@localhost/silent_hill_3_enemies"
DATABASE_URL_4 = "mysql+pymysql://username:password@localhost/silent_hill_4_enemies"
DATABASE_URL_ORIGINS = "mysql+pymysql://username:password@localhost/silent_hill_origins_enemies"
DATABASE_URL_HOMECOMING = "mysql+pymysql://username:password@localhost/silent_hill_homecoming_enemies"
DATABASE_URL_PT = "mysql+pymysql://username:password@localhost/pt_enemies"
DATABASE_URL_DOWNPOUR = "mysql+pymysql://username:password@localhost/silent_hill_downpour_enemies"
DATABASE_URL_SM = "mysql+pymysql://username:password@localhost/silent_hill_sm_enemies"
DATABASE_URL_F = "mysql+pymysql://username:password@localhost/silent_hill_f_enemies"

# Create an engine and a session

engine_sh1 = create_engine(DATABASE_URL_1, echo=True)
SessionSH1 = sessionmaker(bind=engine_sh1)
session_sh1 = SessionSH1()

# Create engine and session for Silent Hill 2 database
engine_sh2 = create_engine(DATABASE_URL_2, echo=True)
SessionSH2 = sessionmaker(bind=engine_sh2)
session_sh2 = SessionSH2()

engine_sh3 = create_engine(DATABASE_URL_3, echo=True)
SessionSH3 = sessionmaker(bind=engine_sh3)
session_sh3 = SessionSH3()

# Create engine and session for Silent Hill 2 database
engine_sh4 = create_engine(DATABASE_URL_4, echo=True)
SessionSH4 = sessionmaker(bind=engine_sh4)
session_sh4 = SessionSH4()

engine_sh_origins = create_engine(DATABASE_URL_ORIGINS, echo=True)
SessionSHOrigins = sessionmaker(bind=engine_sh_origins)
session_sh_origins = SessionSHOrigins()

# Create engine and session for Silent Hill 2 database
engine_sh_homecoming = create_engine(DATABASE_URL_HOMECOMING, echo=True)
SessionSHHomecoming = sessionmaker(bind=engine_sh_homecoming)
session_sh_homecoming = SessionSHHomecoming()

engine_pt = create_engine(DATABASE_URL_PT, echo=True)
SessionPT = sessionmaker(bind=engine_pt)
session_pt = SessionPT()

engine_sh_downpour = create_engine(DATABASE_URL_DOWNPOUR, echo=True)
SessionSHDownpour = sessionmaker(bind=engine_sh_downpour)
session_sh_downpour = SessionSHDownpour()

# Create engine and session for Silent Hill 2 database
engine_sh_f = create_engine(DATABASE_URL_F, echo=True)
SessionSHF = sessionmaker(bind=engine_sh_f)
session_sh_f = SessionSHF()

engine_sh_sm = create_engine(DATABASE_URL_SM, echo=True)
SessionSHSM = sessionmaker(bind=engine_sh_sm)
session_sh_sm = SessionSHSM()

# Optionally, if you need to create tables (if not already created), uncomment the next line:
# Base.metadata.create_all(engine)
# Example: Query all enemies in Silent Hill 1 database


enemies_sh1 = session_sh1.query(Enemy).all()
print("Silent Hill 1 Enemies:")
for enemy in enemies_sh1:
    print(f"ID: {enemy.enemy_id}, Name: {enemy.name}")
    for psychological_symbolism in enemy.psychological_symbolism:
        print(f"Psychological Symbolism: {psychological_symbolism}")
    for otherworld_behavior in enemy.otherworld_behavior:
        print(f"Otherworld Behavior: {otherworld_behavior}")
    for physical_attribute in enemy.physical_attributes:
        print(f"Physical Attribute: {physical_attribute.body_type}, Size: {physical_attribute.size}, Notable Features: {physical_attribute.notable_features}")
    for movement in enemy.movement:
        print(f"Movement: {movement.movement_type}, Speed Level: {movement.speed_level}, Behavior Pattern: {movement.behavior_pattern}")
    for vulnerability in enemy.vulnerabilities:
        print(f"Vulnerability: {vulnerability.weak_to}, Resistant To: {vulnerability.resistant_to}, Immune To: {vulnerability.immune_to}")
    for attack_pattern in enemy.attack_patterns:
        print(f"Attack Pattern: {attack_pattern}")
    for audio_cue in enemy.audio_cues:
        print(f"Audio Cue: {audio_cue}")
    print("\n")

# Example: Query all enemies in Silent Hill 2 database
enemies_sh2 = session_sh2.query(Enemy).all()
print("\nSilent Hill 2 Enemies:")
for enemy in enemies_sh2:
    print(f"ID: {enemy.enemy_id}, Name: {enemy.name}")
    for psychological_symbolism in enemy.psychological_symbolism:
        print(f"Psychological Symbolism: {psychological_symbolism}")
    for otherworld_behavior in enemy.otherworld_behavior:
        print(f"Otherworld Behavior: {otherworld_behavior}")
    for physical_attribute in enemy.physical_attributes:
        print(f"Physical Attribute: {physical_attribute.body_type}, Size: {physical_attribute.size}, Notable Features: {physical_attribute.notable_features}")
    for movement in enemy.movement:
        print(f"Movement: {movement.movement_type}, Speed Level: {movement.speed_level}, Behavior Pattern: {movement.behavior_pattern}")
    for vulnerability in enemy.vulnerabilities:
        print(f"Vulnerability: {vulnerability.weak_to}, Resistant To: {vulnerability.resistant_to}, Immune To: {vulnerability.immune_to}")
    for attack_pattern in enemy.attack_patterns:
        print(f"Attack Pattern: {attack_pattern}")
    for audio_cue in enemy.audio_cues:
        print(f"Audio Cue: {audio_cue}")
    print("\n")


enemies_sh3 = session_sh3.query(Enemy).all()
print("\nSilent Hill 3 Enemies:")
for enemy in enemies_sh3:
    print(f"ID: {enemy.enemy_id}, Name: {enemy.name}")
    for psychological_symbolism in enemy.psychological_symbolism:
        print(f"Psychological Symbolism: {psychological_symbolism}")
    for otherworld_behavior in enemy.otherworld_behavior:
        print(f"Otherworld Behavior: {otherworld_behavior}")
    for physical_attribute in enemy.physical_attributes:
        print(f"Physical Attribute: {physical_attribute.body_type}, Size: {physical_attribute.size}, Notable Features: {physical_attribute.notable_features}")
    for movement in enemy.movement:
        print(f"Movement: {movement.movement_type}, Speed Level: {movement.speed_level}, Behavior Pattern: {movement.behavior_pattern}")
    for vulnerability in enemy.vulnerabilities:
        print(f"Vulnerability: {vulnerability.weak_to}, Resistant To: {vulnerability.resistant_to}, Immune To: {vulnerability.immune_to}")
    for attack_pattern in enemy.attack_patterns:
        print(f"Attack Pattern: {attack_pattern}")
    for audio_cue in enemy.audio_cues:
        print(f"Audio Cue: {audio_cue}")
    print("\n")

enemies_sh4 = session_sh4.query(Enemy).all()
print("\nSilent Hill 4 Enemies:")
for enemy in enemies_sh4:
    print(f"ID: {enemy.enemy_id}, Name: {enemy.name}")
    for psychological_symbolism in enemy.psychological_symbolism:
        print(f"Psychological Symbolism: {psychological_symbolism}")
    for otherworld_behavior in enemy.otherworld_behavior:
        print(f"Otherworld Behavior: {otherworld_behavior}")
    for physical_attribute in enemy.physical_attributes:
        print(f"Physical Attribute: {physical_attribute.body_type}, Size: {physical_attribute.size}, Notable Features: {physical_attribute.notable_features}")
    for movement in enemy.movement:
        print(f"Movement: {movement.movement_type}, Speed Level: {movement.speed_level}, Behavior Pattern: {movement.behavior_pattern}")
    for vulnerability in enemy.vulnerabilities:
        print(f"Vulnerability: {vulnerability.weak_to}, Resistant To: {vulnerability.resistant_to}, Immune To: {vulnerability.immune_to}")
    for attack_pattern in enemy.attack_patterns:
        print(f"Attack Pattern: {attack_pattern}")
    for audio_cue in enemy.audio_cues:
        print(f"Audio Cue: {audio_cue}")
    print("\n")


enemies_sh_origins = session_sh_origins.query(Enemy).all()
print("\nSilent Hill Origins Enemies:")
for enemy in enemies_sh_origins:
    print(f"ID: {enemy.enemy_id}, Name: {enemy.name}")
    for psychological_symbolism in enemy.psychological_symbolism:
        print(f"Psychological Symbolism: {psychological_symbolism}")
    for otherworld_behavior in enemy.otherworld_behavior:
        print(f"Otherworld Behavior: {otherworld_behavior}")
    for physical_attribute in enemy.physical_attributes:
        print(f"Physical Attribute: {physical_attribute.body_type}, Size: {physical_attribute.size}, Notable Features: {physical_attribute.notable_features}")
    for movement in enemy.movement:
        print(f"Movement: {movement.movement_type}, Speed Level: {movement.speed_level}, Behavior Pattern: {movement.behavior_pattern}")
    for vulnerability in enemy.vulnerabilities:
        print(f"Vulnerability: {vulnerability.weak_to}, Resistant To: {vulnerability.resistant_to}, Immune To: {vulnerability.immune_to}")
    for attack_pattern in enemy.attack_patterns:
        print(f"Attack Pattern: {attack_pattern}")
    for audio_cue in enemy.audio_cues:
        print(f"Audio Cue: {audio_cue}")
    print("\n")


enemies_sh_downpour = session_sh_downpour.query(Enemy).all()
print("\nSilent Hill Downpour Enemies:")
for enemy in enemies_sh_downpour:
    print(f"ID: {enemy.enemy_id}, Name: {enemy.name}")
    for psychological_symbolism in enemy.psychological_symbolism:
        print(f"Psychological Symbolism: {psychological_symbolism}")
    for otherworld_behavior in enemy.otherworld_behavior:
        print(f"Otherworld Behavior: {otherworld_behavior}")
    for physical_attribute in enemy.physical_attributes:
        print(f"Physical Attribute: {physical_attribute.body_type}, Size: {physical_attribute.size}, Notable Features: {physical_attribute.notable_features}")
    for movement in enemy.movement:
        print(f"Movement: {movement.movement_type}, Speed Level: {movement.speed_level}, Behavior Pattern: {movement.behavior_pattern}")
    for vulnerability in enemy.vulnerabilities:
        print(f"Vulnerability: {vulnerability.weak_to}, Resistant To: {vulnerability.resistant_to}, Immune To: {vulnerability.immune_to}")
    for attack_pattern in enemy.attack_patterns:
        print(f"Attack Pattern: {attack_pattern}")
    for audio_cue in enemy.audio_cues:
        print(f"Audio Cue: {audio_cue}")
    print("\n")


enemies_sh_homecoming = session_sh_homecoming.query(Enemy).all()
print("\nSilent Hill Homecoming Enemies:")
for enemy in enemies_sh_homecoming:
    print(f"ID: {enemy.enemy_id}, Name: {enemy.name}")
    for psychological_symbolism in enemy.psychological_symbolism:
        print(f"Psychological Symbolism: {psychological_symbolism}")
    for otherworld_behavior in enemy.otherworld_behavior:
        print(f"Otherworld Behavior: {otherworld_behavior}")
    for physical_attribute in enemy.physical_attributes:
        print(f"Physical Attribute: {physical_attribute.body_type}, Size: {physical_attribute.size}, Notable Features: {physical_attribute.notable_features}")
    for movement in enemy.movement:
        print(f"Movement: {movement.movement_type}, Speed Level: {movement.speed_level}, Behavior Pattern: {movement.behavior_pattern}")
    for vulnerability in enemy.vulnerabilities:
        print(f"Vulnerability: {vulnerability.weak_to}, Resistant To: {vulnerability.resistant_to}, Immune To: {vulnerability.immune_to}")
    for attack_pattern in enemy.attack_patterns:
        print(f"Attack Pattern: {attack_pattern}")
    for audio_cue in enemy.audio_cues:
        print(f"Audio Cue: {audio_cue}")
    print("\n")



enemies_pt = session_pt.query(Enemy).all()
print("\nPT Enemies:")
for enemy in enemies_pt:
    print(f"ID: {enemy.enemy_id}, Name: {enemy.name}")
    for psychological_symbolism in enemy.psychological_symbolism:
        print(f"Psychological Symbolism: {psychological_symbolism}")
    for otherworld_behavior in enemy.otherworld_behavior:
        print(f"Otherworld Behavior: {otherworld_behavior}")
    for physical_attribute in enemy.physical_attributes:
        print(f"Physical Attribute: {physical_attribute.body_type}, Size: {physical_attribute.size}, Notable Features: {physical_attribute.notable_features}")
    for movement in enemy.movement:
        print(f"Movement: {movement.movement_type}, Speed Level: {movement.speed_level}, Behavior Pattern: {movement.behavior_pattern}")
    for vulnerability in enemy.vulnerabilities:
        print(f"Vulnerability: {vulnerability.weak_to}, Resistant To: {vulnerability.resistant_to}, Immune To: {vulnerability.immune_to}")
    for attack_pattern in enemy.attack_patterns:
        print(f"Attack Pattern: {attack_pattern}")
    for audio_cue in enemy.audio_cues:
        print(f"Audio Cue: {audio_cue}")
    print("\n")



# Query distinct trait options for each category

# For physical_attributes, we use 'body_type'
body_types = [row[0] for row in session.query(distinct(PhysicalAttribute.body_type)).all()]
# For movement, we use 'movement_type'
movement_types = [row[0] for row in session.query(distinct(Movement.movement_type)).all()]
# For attack_patterns, we use 'attack_name'
attack_names = [row[0] for row in session.query(distinct(AttackPattern.attack_name)).all()]

print("Available body types:", body_types)
print("Available movement types:", movement_types)
print("Available attack names:", attack_names)

# Build the trait dictionary
# (If you have symbolic data in your tables, you can also query that; for now we use empty symbolism strings)
trait_db = {
    "body_type": [{"name": bt, "symbolism": ""} for bt in body_types if bt is not None],
    "movement_type": [{"name": mt, "symbolism": ""} for mt in movement_types if mt is not None],
    "attack_name": [{"name": an, "symbolism": ""} for an in attack_names if an is not None]
}

# List available trait categories from the database
print("Trait categories loaded from SQL:", list(trait_db.keys()))

categories = list(trait_db.keys())

# Helper function to randomly select a trait from a given category
def random_trait(category):
    return random.choice(trait_db[category])["name"]

# Define the fitness and individual classes
creator.create("FitnessMax", base.Fitness, weights=(1.0,))  # We are maximizing fitness
creator.create("Monster", list, fitness=creator.FitnessMax)

# Register a random trait generator for each category
toolbox = base.Toolbox()
for cat in categories:
    toolbox.register(f"random_{cat}", random_trait, cat)

# Create an individual by cycling through each category's generator once
toolbox.register("individual", tools.initCycle, creator.Monster,
                 (toolbox.random_body_type, toolbox.random_movement_type, toolbox.random_attack_name), n=1)
toolbox.register("population", tools.initRepeat, list, toolbox.individual)

# Dummy fitness function: for demonstration, we reward if 'body_type' equals "Emaciated Humanoid"
def eval_monster(individual):
    traits = {cat: val for cat, val in zip(categories, individual)}
    fitness = 0.0
    if traits.get("body_type") == "Emaciated Humanoid":
        fitness += 1.0
    return (fitness,)

toolbox.register("evaluate", eval_monster)
toolbox.register("mate", tools.cxTwoPoint)

# Mutation: Randomly change one trait to another option in the same category
def mutate_monster(individual):
    idx = random.randrange(len(individual))
    cat = categories[idx]
    current_value = individual[idx]
    options = [t["name"] for t in trait_db[cat] if t["name"] != current_value]
    if options:
        individual[idx] = random.choice(options)
    return (individual,)

toolbox.register("mutate", mutate_monster)
toolbox.register("select", tools.selTournament, tournsize=3)

# Create the initial population
population = toolbox.population(n=10)
print("Initial GA population sample:")
for ind in population[:3]:
    print({cat: val for cat, val in zip(categories, ind)})




for ind in population:
    ind.fitness.values = toolbox.evaluate(ind)

# Select the next generation individuals
offspring = toolbox.select(population, len(population))
offspring = list(map(toolbox.clone, offspring))

# Apply crossover on pairs of individuals
for child1, child2 in zip(offspring[::2], offspring[1::2]):
    if random.random() < 0.8:  # 80% chance to mate
        toolbox.mate(child1, child2)
        del child1.fitness.values, child2.fitness.values

# Apply mutation on individuals
for mutant in offspring:
    if random.random() < 0.3:  # 30% chance to mutate
        toolbox.mutate(mutant)
        del mutant.fitness.values

# Re-evaluate individuals with invalid fitness
for ind in offspring:
    if not ind.fitness.valid:
        ind.fitness.values = toolbox.evaluate(ind)

# Replace the old population with the new generation
population[:] = offspring

print("Post-evolution population sample:")
for ind in population[:3]:
    print({cat: val for cat, val in zip(categories, ind)}, "Fitness:", ind.fitness.values[0])