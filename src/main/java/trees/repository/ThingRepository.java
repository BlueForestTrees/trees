package trees.repository;

import org.springframework.stereotype.Service;

import trees.domain.graph.Node;

@Service
public class ThingRepository extends AbstractRepository<Node>{

    public Iterable<Node> names(String nameRegex){
        final String query = "MATCH (n) WHERE n.name =~ {nameRegex} RETURN n";
        return session.query(Node.class, query, params("nameRegex", nameRegex));
    }

    @Override
    Class<Node> getEntityType() {
        return Node.class;
    }
}
