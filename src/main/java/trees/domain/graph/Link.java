package trees.domain.graph;

import org.neo4j.ogm.annotation.EndNode;
import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.Property;
import org.neo4j.ogm.annotation.RelationshipEntity;
import org.neo4j.ogm.annotation.StartNode;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RelationshipEntity(type = "links")
public class Link implements GraphElementBase {
    @GraphId
    private Long id;
    @StartNode
    private Node trunk;
    @EndNode
    private Node root;
    @Property
    private Double qt;

    @Property
    private String displayUnit;

    @Override
    public String toString() {
        return "Link{" +
                "id=" + id +
                ", trunk=" + trunk.getId() +
                ", root=" + root.getId() +
                ", qt=" + qt +
                ", displayUnit='" + displayUnit + '\'' +
                '}';
    }
}