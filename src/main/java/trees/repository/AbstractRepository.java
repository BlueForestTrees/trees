package trees.repository;


import java.security.InvalidParameterException;
import java.util.HashMap;
import java.util.Map;

import org.neo4j.ogm.session.Session;
import org.springframework.beans.factory.annotation.Autowired;

import trees.domain.graph.GraphElementBase;

public abstract class AbstractRepository<T extends GraphElementBase> {
    private static final int DEPTH_LIST = 0;
    private static final int DEPTH_ENTITY = 10;

    @Autowired
    protected Session session;

    public Iterable<T> findAll() {
        return session.loadAll(getEntityType(), DEPTH_LIST);
    }

    public T find(Long id) {
        return session.load(getEntityType(), id, DEPTH_ENTITY);
    }

    public void delete(final Long id) {
        T entity = session.load(getEntityType(), id);
        if(entity == null){
            throw new InvalidParameterException("L'objet " + getEntityType().getTypeName() + " portant l'id " + id + " n'existe pas");
        }
        session.delete(entity);
    }

    public T createOrUpdate(T entity) {
        session.save(entity, DEPTH_ENTITY);
        return find(entity.getId());
    }

    abstract Class<T> getEntityType();

    protected Map<String, Object> params(final Object... param) {
        HashMap<String, Object> map = new HashMap<>();
        for(int i = 0; i < param.length; i+=2){
            map.put((String) param[i], param[i+1]);
        }
        return map;
    }

    public void clear(){
        session.clear();
    }
}
